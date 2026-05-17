'use client'

import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useSearchParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validSession, setValidSession] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    // Supabase puts the token in the URL hash
    // We need to set the session from the URL
    async function handleReset() {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        setValidSession(true)
      } else {
        // Try to get session from URL hash params
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')

        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          if (!sessionError) setValidSession(true)
          else setError('This reset link has expired. Please request a new one.')
        } else {
          setError('Invalid or expired reset link. Please request a new one.')
        }
      }
      setCheckingSession(false)
    }
    handleReset()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!password) { setError('Please enter a password.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (checkingSession) {
    return (
      <div style={styles.centered}>
        <div style={styles.spinner} />
        <p style={{ color: '#888', marginTop: 16 }}>Verifying your link...</p>
      </div>
    )
  }

  if (success) {
    return (
      <div style={styles.centered}>
        <div style={styles.successIcon}>✅</div>
        <h2 style={styles.successTitle}>Password Updated!</h2>
        <p style={styles.successSub}>
          Your password has been changed successfully.{' '}
          Open the Sayvor app to sign in with your new password.
        </p>
        <a href="sayvor://" style={styles.openAppBtn}>
          Open Sayvor App
        </a>
        {/* <p style={styles.downloadHint}>
          Don't have Sayvor yet?{' '}
          
            href="https://apps.apple.com/us/app/sayvor/id6761675195"
            style={{ color: '#ff3800' }}
          >
            Download it here
          </a>
        </p> */}
      </div>
    )
  }

  if (!validSession) {
    return (
      <div style={styles.centered}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h2 style={{ ...styles.title, color: '#1a1a1a' }}>Link Expired</h2>
        <p style={styles.subtitle}>
          This password reset link has expired or is invalid.
          Please request a new one from the Sayvor app.
        </p>
        <a href="sayvor://" style={styles.openAppBtn}>
          Open Sayvor App
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Reset Your Password</h2>
      <p style={styles.subtitle}>Enter your new password below.</p>

      {error && (
        <div style={styles.errorBox}>
          ⚠️ {error}
        </div>
      )}

      {/* New Password */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>New Password</label>
        <div style={styles.inputWrap}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 6 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {/* Strength indicator */}
        {password.length > 0 && (
          <div style={styles.strengthWrap}>
            <div style={{
              ...styles.strengthBar,
              width: `${Math.min(100, (password.length / 12) * 100)}%`,
              backgroundColor: password.length < 6 ? '#e05a3a' : password.length < 10 ? '#e8a020' : '#2d6a2d',
            }} />
            <span style={styles.strengthLabel}>
              {password.length < 6 ? 'Too short' : password.length < 10 ? 'Good' : 'Strong'}
            </span>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Confirm Password</label>
        <div style={styles.inputWrap}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        {confirmPassword && password !== confirmPassword && (
          <p style={{ color: '#e05a3a', fontSize: 12, marginTop: 4 }}>
            Passwords don't match
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.submitBtn,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <span style={{ fontSize: 22 }}>💌</span>
        <span style={styles.logo}>Sayvor</span>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <Suspense fallback={
          <div style={styles.centered}>
            <p style={{ color: '#888' }}>Loading...</p>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>

      {/* Footer */}
      <p style={styles.footer}>
        © 2026 Sayvor · {' '}
        <a href="/privacy" style={{ color: '#888' }}>Privacy</a>
        {' · '}
        <a href="/terms" style={{ color: '#888' }}>Terms</a>
      </p>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '24px 16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  logo: {
    fontSize: 20,
    fontWeight: 800,
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: '40px 32px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
    border: '1px solid #f0f0f0',
  },
  centered: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: '0 0 8px',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    margin: '0 0 28px',
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  errorBox: {
    backgroundColor: '#fff5f2',
    border: '1px solid #ffded5',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 14,
    color: '#e05a3a',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#1a1a1a',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrap: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    border: '1.5px solid #f0f0f0',
    paddingInline: 14,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: '14px 0',
    fontSize: 15,
    color: '#1a1a1a',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
  },
  eyeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    padding: '0 4px',
  },
  strengthWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  strengthBar: {
    height: 4,
    borderRadius: 2,
    transition: 'width 0.3s, background-color 0.3s',
  },
  strengthLabel: {
    fontSize: 11,
    color: '#888',
    whiteSpace: 'nowrap',
  },
  submitBtn: {
    backgroundColor: '#ff3800',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: '17px 0',
    fontSize: 16,
    fontWeight: 700,
    width: '100%',
    marginTop: 8,
    boxShadow: '0 6px 20px rgba(255,56,0,0.3)',
  },
  successIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: '0 0 12px',
  },
  successSub: {
    fontSize: 15,
    color: '#888',
    lineHeight: 1.6,
    margin: '0 0 28px',
    textAlign: 'center',
  },
  openAppBtn: {
    display: 'inline-block',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 50,
    padding: '14px 32px',
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 16,
  },
  downloadHint: {
    fontSize: 13,
    color: '#aaa',
  },
  spinner: {
    width: 32,
    height: 32,
    border: '3px solid #f0f0f0',
    borderTop: '3px solid #ff3800',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  footer: {
    marginTop: 32,
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
}