'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!password.trim()) { setError('Please enter a new password.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }

    setLoading(true)

    try {
      // Step 1 — sign in with email OTP (passwordless)
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { shouldCreateUser: false }
      })

      if (signInError) {
        setError('Email not found. Please check and try again.')
        setLoading(false)
        return
      }

      // Step 2 — update password directly
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (e: any) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

//   if (success) {
//     return (
//       <div style={page}>
//         <div style={card}>
//           <div style={{ textAlign: 'center' }}>
//             <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
//             <h2 style={title}>Password Updated!</h2>
//             <p style={subtitle}>
//               Your password has been changed.
//               Open the Sayvor app and sign in with your new password.
//             </p>
            
//               href="https://apps.apple.com/us/app/sayvor/id6761675195"
//               style={btn}
//             >
//               Open Sayvor App
//             </a>
//           </div>
//         </div>
//       </div>
//     )
//   }

  return (
    <div style={page}>

      {/* Logo */}
      <div style={logoRow}>
        <span style={{ fontSize: 22 }}>💌</span>
        <span style={logoText}>Sayvor</span>
      </div>

      {/* Card */}
      <div style={card}>
        <h2 style={title}>Reset Password</h2>
        <p style={subtitle}>Enter your email and choose a new password.</p>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleReset} style={form}>

          {/* Email */}
          <div style={inputGroup}>
            <label style={label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={input}
              disabled={loading}
            />
          </div>

          {/* New Password */}
          <div style={inputGroup}>
            <label style={label}>New Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={input}
              disabled={loading}
            />
          </div>

          {/* Confirm Password */}
          <div style={inputGroup}>
            <label style={label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={input}
              disabled={loading}
            />
            {confirmPassword && password !== confirmPassword && (
              <p style={{ color: '#e05a3a', fontSize: 12, marginTop: 4 }}>
                Passwords don't match
              </p>
            )}
          </div>

          <button type="submit" disabled={loading} style={{
            ...submitBtn,
            opacity: loading ? 0.6 : 1,
          }}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>

        </form>
      </div>

      {/* Footer */}
      <p style={footer}>
        © 2026 Sayvor ·{' '}
        <a href="/privacy" style={{ color: '#aaa' }}>Privacy</a>
        {' · '}
        <a href="/terms" style={{ color: '#aaa' }}>Terms</a>
      </p>

    </div>
  )
}

// ── Styles ──
const page: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#f9f9f9',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  padding: '24px 16px',
}

const logoRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 28,
}

const logoText: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 800,
  color: '#1a1a1a',
}

const card: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: 24,
  padding: '40px 32px',
  width: '100%',
  maxWidth: 420,
  boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
  border: '1px solid #f0f0f0',
}

const title: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 800,
  color: '#1a1a1a',
  margin: '0 0 8px',
  letterSpacing: -0.5,
}

const subtitle: React.CSSProperties = {
  fontSize: 14,
  color: '#888',
  margin: '0 0 28px',
  lineHeight: 1.6,
}

const errorBox: React.CSSProperties = {
  backgroundColor: '#fff5f2',
  border: '1px solid #ffded5',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: 14,
  color: '#e05a3a',
  marginBottom: 20,
}

const form: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const inputGroup: React.CSSProperties = {
  marginBottom: 18,
}

const label: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: 7,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}

const input: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  fontSize: 15,
  color: '#1a1a1a',
  backgroundColor: '#f5f5f5',
  border: '1.5px solid #f0f0f0',
  borderRadius: 14,
  outline: 'none',
  boxSizing: 'border-box',
}

const submitBtn: React.CSSProperties = {
  backgroundColor: '#ff3800',
  color: '#fff',
  border: 'none',
  borderRadius: 14,
  padding: '17px 0',
  fontSize: 16,
  fontWeight: 700,
  width: '100%',
  cursor: 'pointer',
  marginTop: 8,
  boxShadow: '0 6px 20px rgba(255,56,0,0.3)',
}

const btn: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: 50,
  padding: '14px 32px',
  fontSize: 15,
  fontWeight: 700,
  marginTop: 24,
}

const footer: React.CSSProperties = {
  marginTop: 28,
  fontSize: 12,
  color: '#ccc',
  textAlign: 'center',
}