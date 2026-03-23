'use client'

import { useState, useEffect } from 'react'

type Card = {
  id: string
  image_url: string
  recipient_name: string | null
  message: string | null
  created_at: string
  share_token: string
  view_count: number | null
} | null

const CONFETTI_COLORS = [
  '#ff3800', '#ffd700', '#ff69b4',
  '#00bcd4', '#4caf50', '#9c27b0', '#ff9800',
]

function ConfettiLayer() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }))

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: 2,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default function CardView({ card }: { card: Card }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (imageLoaded) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
    }
  }, [imageLoaded])

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: card?.recipient_name
            ? `A card for ${card.recipient_name}`
            : 'Someone sent you a card 💌',
          text: card?.message ?? 'Check out this card made with Sayvor!',
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch (_) {}
  }

  async function handleSaveImage() {
    if (!card?.image_url) return
    try {
      const res = await fetch(card.image_url)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'sayvor-card.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (_) {
      window.open(card.image_url, '_blank')
    }
  }

  const sentDate = card
    ? new Date(card.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  // ── Not found ──
  if (!card) {
    return (
      <>
        <style>{globalStyles}</style>
        <div style={s.container}>
          <div style={s.header}>
            <a href="/" style={s.logo}>Sayvor ✦</a>
          </div>
          <div style={s.notFound}>
            <span style={{ fontSize: 72, marginBottom: 24, display: 'block' }}>💌</span>
            <h1 style={s.notFoundTitle}>Card not found</h1>
            <p style={s.notFoundSub}>
              This link may have expired or been removed.
            </p>
            <a href="/" style={s.primaryBtn}>Create your own card →</a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{globalStyles}</style>
      {showConfetti && <ConfettiLayer />}

      <div style={s.container}>

        {/* ── Header ── */}
        <div style={s.header}>
          <a href="/" style={s.logo}>Sayvor ✦</a>
        </div>

        {/* ── Hero text ── */}
        <div style={s.heroSection} className="animate-fadeSlideUp">
          <div style={s.fromBadge}>
            <span style={s.fromBadgeDot} />
            You received a card
          </div>

          {card.recipient_name ? (
            <h1 style={s.heroTitle}>
              Hey <span style={s.nameAccent}>{card.recipient_name}</span> 💌
            </h1>
          ) : (
            <h1 style={s.heroTitle}>Someone made this for you 💌</h1>
          )}

          <p style={s.heroSub}>
            Tap the card to read the message ✨
          </p>
        </div>

        {/* ── Card with 3D flip ── */}
        <div
          style={s.cardScene}
          onClick={() => card.message && setFlipped(f => !f)}
          title={card.message ? 'Click to flip' : ''}
        >
          <div style={{
            ...s.cardInner,
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}>

            {/* Front */}
            <div style={s.cardFront}>
              {!imageLoaded && (
                <div style={s.skeleton}>
                  <div style={s.shimmer} />
                </div>
              )}
              <img
                src={card.image_url}
                alt="Your card"
                style={{
                  ...s.cardImg,
                  opacity: imageLoaded ? 1 : 0,
                }}
                onLoad={() => setImageLoaded(true)}
              />
              {/* Shine */}
              <div style={s.cardShine} />
              {/* Flip hint on card */}
              {imageLoaded && card.message && !flipped && (
                <div style={s.flipHintOverlay}>
                  <span style={s.flipHintOverlayText}>Tap to read message</span>
                </div>
              )}
            </div>

            {/* Back */}
            {card.message && (
              <div style={s.cardBack}>
                <div style={s.cardBackContent}>
                  <span style={s.cardBackQuote}>"</span>
                  <p style={s.cardBackMessage}>{card.message}</p>
                  <div style={s.cardBackSignature}>
                    <div style={s.cardBackLine} />
                    <span style={s.cardBackMadeWith}>Made with Sayvor ✨</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── Flip button ── */}
        {card.message && (
          <button
            style={s.flipBtn}
            onClick={() => setFlipped(f => !f)}
          >
            {flipped ? '← See the card' : '💬 Read the message'}
          </button>
        )}

        {/* ── Date ── */}
        <p style={s.dateSent}>Received {sentDate}</p>

        {/* ── Action buttons ── */}
        <div style={s.actionRow}>
          <button
            style={s.actionBtnOutline}
            onClick={handleSaveImage}
          >
            {saved ? (
              <>✓ Saved!</>
            ) : (
              <>
                <DownloadIcon />
                Save Card
              </>
            )}
          </button>

          <button
            style={s.actionBtnFilled}
            onClick={handleShare}
          >
            {copied ? (
              <>✓ Copied!</>
            ) : (
              <>
                <ShareIcon />
                Share Card
              </>
            )}
          </button>
        </div>

        {/* ── Message below card ── */}
        {card.message && (
          <div style={s.messageCard}>
            <span style={s.messageQuoteMark}>"</span>
            <p style={s.messageText}>{card.message}</p>
          </div>
        )}

        {/* ── Divider ── */}
        <div style={s.divider} />

        {/* ── Reply CTA ── */}
        <div style={s.replyCta}>
          <div style={s.replyCtaContent}>
            <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>💝</span>
            <h3 style={s.replyCtaTitle}>Want to send one back?</h3>
            <p style={s.replyCtaSub}>
              Create a beautiful AI greeting card for someone you love — in seconds, for free.
            </p>

            {/* Feature pills */}
            <div style={s.featurePills}>
              {['✨ AI-generated', '🎤 Voice creation', '💌 Instant delivery'].map((f, i) => (
                <span key={i} style={s.featurePill}>{f}</span>
              ))}
            </div>

            <a href="https://apps.apple.com" style={s.replyCtaBtn}>
              <AppleIcon />
              Download Sayvor — Free
            </a>
            <p style={s.replyCtaHint}>
              iOS · Free to download · No account needed to view cards
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={s.footer}>
          <a href="/" style={s.footerLogo}>Sayvor</a>
          <p style={s.footerText}>
            AI Greeting Cards · Made with ❤️
          </p>
          <div style={s.footerLinks}>
            <a href="/privacy" style={s.footerLink}>Privacy</a>
            <span style={s.footerDot}>·</span>
            <a href="/terms" style={s.footerLink}>Terms</a>
          </div>
        </div>

      </div>
    </>
  )
}

// ── Icons ──
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline', marginRight: 6 }}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline', marginRight: 6 }}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
      style={{ display: 'inline', marginRight: 8 }}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

// ── Global CSS ──
const globalStyles = `
  @keyframes confettiFall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes flipIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeSlideUp {
    animation: fadeSlideUp 0.7s ease forwards;
  }
  * { box-sizing: border-box; }
  body { margin: 0; }
`

// ── Styles ──
const s: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '0 20px 80px',
  },

  // Header
  header: {
    width: '100%',
    maxWidth: 440,
    display: 'flex',
    justifyContent: 'center',
    padding: '28px 0 16px',
  },
  logo: {
    fontSize: 20,
    fontWeight: 800,
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: -0.3,
  },

  // Hero
  heroSection: {
    textAlign: 'center',
    paddingBottom: 28,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  fromBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,56,0,0.1)',
    border: '1px solid rgba(255,56,0,0.2)',
    borderRadius: 50,
    padding: '7px 16px',
    fontSize: 12,
    fontWeight: 700,
    color: '#ff3800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  fromBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#ff3800',
    display: 'inline-block',
  },
  heroTitle: {
    fontSize: 'clamp(26px, 6vw, 36px)' as any,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 1.2,
    margin: 0,
  },
  nameAccent: { color: '#ff3800' },
  heroSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
  },

  // Card scene
  cardScene: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: '3/4',
    perspective: '1200px',
    cursor: 'pointer',
    marginBottom: 16,
  },
  cardInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Front
  cardFront: {
    position: 'absolute',
    inset: 0,
    borderRadius: 28,
    overflow: 'hidden',
    backfaceVisibility: 'hidden' as const,
    boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'opacity 0.4s ease',
  },
  cardShine: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  flipHintOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '40px 20px 20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  flipHintOverlayText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 600,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: '6px 14px',
    backdropFilter: 'blur(8px)',
  },
  skeleton: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
    animation: 'shimmer 1.8s infinite',
  },

  // Back
  cardBack: {
    position: 'absolute',
    inset: 0,
    borderRadius: 28,
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden' as const,
    transform: 'rotateY(180deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
  },
  cardBackContent: {
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    height: '100%',
    justifyContent: 'center',
  },
  cardBackQuote: {
    fontSize: 72,
    lineHeight: 0.7,
    color: '#ff3800',
    opacity: 0.2,
    fontFamily: 'Georgia, serif',
    alignSelf: 'flex-start',
  },
  cardBackMessage: {
    fontSize: 17,
    color: '#1a1a1a',
    lineHeight: 1.8,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Georgia, serif',
    margin: 0,
  },
  cardBackSignature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  cardBackLine: {
    width: 48,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#ff3800',
    opacity: 0.4,
  },
  cardBackMadeWith: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Flip button
  flipBtn: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)',
    padding: '11px 24px',
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 10,
    transition: 'all 0.2s',
  },

  // Date
  dateSent: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    fontWeight: 500,
  },

  // Actions
  actionRow: {
    display: 'flex',
    gap: 12,
    width: '100%',
    maxWidth: 340,
    marginBottom: 28,
  },
  actionBtnOutline: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.8)',
    padding: '13px 0',
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  actionBtnFilled: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3800',
    border: 'none',
    color: '#fff',
    padding: '13px 0',
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255,56,0,0.35)',
  },

  // Message card
  messageCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 24,
    padding: '24px 28px 20px',
    marginBottom: 32,
    position: 'relative',
  },
  messageQuoteMark: {
    position: 'absolute',
    top: 8,
    left: 18,
    fontSize: 52,
    lineHeight: 1,
    color: '#ff3800',
    opacity: 0.2,
    fontFamily: 'Georgia, serif',
  },
  messageText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.75,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingTop: 24,
    margin: 0,
  },

  // Divider
  divider: {
    width: '100%',
    maxWidth: 340,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: 36,
  },

  // Reply CTA
  replyCta: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 48,
  },
  replyCtaContent: {
    backgroundColor: '#111',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 32,
    padding: '36px 28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 10,
  },
  replyCtaTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -0.3,
    margin: 0,
  },
  replyCtaSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.65,
    maxWidth: 260,
    margin: 0,
  },
  featurePills: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 4,
  },
  featurePill: {
    backgroundColor: 'rgba(255,56,0,0.1)',
    border: '1px solid rgba(255,56,0,0.2)',
    borderRadius: 50,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 600,
    color: '#ff3800',
  },
  replyCtaBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3800',
    color: '#fff',
    padding: '16px 0',
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 700,
    textDecoration: 'none',
    width: '100%',
    boxShadow: '0 8px 28px rgba(255,56,0,0.35)',
    marginTop: 4,
  },
  replyCtaHint: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.2)',
    margin: 0,
    lineHeight: 1.6,
  },

  // Footer
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: 800,
    color: 'rgba(255,255,255,0.15)',
    textDecoration: 'none',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.12)',
    margin: 0,
  },
  footerLinks: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.2)',
    textDecoration: 'none',
  },
  footerDot: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.1)',
  },

  // Not found
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 80,
    gap: 16,
    maxWidth: 320,
  },
  notFoundTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -0.5,
    margin: 0,
  },
  notFoundSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.65,
    margin: 0,
  },
  primaryBtn: {
    display: 'inline-block',
    backgroundColor: '#ff3800',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 700,
    textDecoration: 'none',
    marginTop: 8,
    boxShadow: '0 8px 28px rgba(255,56,0,0.35)',
  },
}