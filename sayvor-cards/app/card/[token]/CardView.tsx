'use client'
import { useState } from 'react'

type Card = {
  id: string
  image_url: string
  message: string
  recipient_name: string
  prompt: string
  created_at: string
}

export default function CardViewer({ card }: { card: Card }) {
  const [face, setFace] = useState<'front' | 'back'>('front')
  const [flipping, setFlipping] = useState(false)

  function flip() {
    if (flipping) return
    setFlipping(true)
    setTimeout(() => {
      setFace(f => f === 'front' ? 'back' : 'front')
      setFlipping(false)
    }, 200)
  }

  const ACCENT = '#ff3800'

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0ece6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
      }}>
        <span style={{ fontSize: 20 }}>💌</span>
        <span style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#1a1a1a',
        }}>
          {card.recipient_name
            ? `${card.recipient_name}, someone made you a card!`
            : 'Someone made you a card!'}
        </span>
      </div>

      {/* Card */}
      <div
        onClick={flip}
        style={{
          width: '100%',
          maxWidth: 360,
          aspectRatio: '0.74',
          borderRadius: 24,
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          opacity: flipping ? 0 : 1,
          transform: flipping ? 'scale(0.97)' : 'scale(1)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          backgroundColor: face === 'back' ? '#fff' : '#111',
        }}
      >
        {face === 'front' ? (
          // Front — AI generated image
          <img
            src={card.image_url}
            alt="Card front"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          // Back — message
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            backgroundColor: '#fff',
            boxSizing: 'border-box',
          }}>
            {card.message ? (
              <p style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: '#1a1a1a',
                textAlign: 'center',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
                margin: 0,
              }}>
                {card.message}
              </p>
            ) : (
              <p style={{
                fontSize: 16,
                color: '#ccc',
                textAlign: 'center',
                fontStyle: 'italic',
                margin: 0,
              }}>
                No message added
              </p>
            )}
            <div style={{
              marginTop: 32,
              width: 40,
              height: 1,
              backgroundColor: '#e0e0e0',
            }} />
            <p style={{
              marginTop: 16,
              fontSize: 11,
              color: '#ccc',
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
              Made with Sayvor ✨
            </p>
          </div>
        )}
      </div>

      {/* Flip instruction */}
      <p style={{
        marginTop: 16,
        fontSize: 13,
        color: '#aaa',
        fontWeight: 500,
      }}>
        {face === 'front' ? 'Tap the card to read the message →' : '← Tap to see the card'}
      </p>

      {/* Card / Message pill switcher */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginTop: 16,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 50,
        padding: 4,
      }}>
        {(['Card', 'Message'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFace(tab === 'Card' ? 'front' : 'back')}
            style={{
              paddingInline: 24,
              paddingBlock: 9,
              borderRadius: 50,
              border: 'none',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: face === (tab === 'Card' ? 'front' : 'back') ? 700 : 600,
              backgroundColor: face === (tab === 'Card' ? 'front' : 'back') ? '#1a1a1a' : 'transparent',
              color: face === (tab === 'Card' ? 'front' : 'back') ? '#fff' : '#888',
              transition: 'all 0.2s ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Download button */}
      <a
        href={card.image_url}
        download="sayvor-card.png"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: ACCENT,
          color: '#fff',
          textDecoration: 'none',
          borderRadius: 50,
          paddingInline: 24,
          paddingBlock: 12,
          fontSize: 14,
          fontWeight: 700,
          boxShadow: '0 4px 16px rgba(255,56,0,0.3)',
        }}
      >
        ↓ Save Card
      </a>

      {/* Sayvor branding */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#bbb', marginBottom: 8 }}>
          Want to create your own AI cards?
        </p>
        <a
          href="https://apps.apple.com"
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: ACCENT,
            textDecoration: 'none',
          }}
        >
          Download Sayvor →
        </a>
      </div>

    </div>
  )
}