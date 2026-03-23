import Link from 'next/link'

export default function Home() {
  return (
    <main style={s.page}>

      {/* ── Nav ── */}
      {/* <nav style={s.nav}>
  <div style={s.navLogo}>
    <span style={s.navLogoText}>Sayvor</span>
    <span style={s.navLogoDot}>✦</span>
  </div>
  <div style={s.navLinks}>
    <a href="#how-it-works" style={s.navLink}>How it works</a>
    <a href="#features" style={s.navLink}>Features</a>
    
      href="https://apps.apple.com"
      style={s.navCta}
    >
      Download App
    </a>
  </div>
</nav> */}

      {/* ── Hero ── */}
      <section style={s.hero}>
        <div style={s.heroBadge}>
          <span style={s.heroBadgeDot} />
          AI-Powered Greeting Cards
        </div>

        <h1 style={s.heroTitle}>
          Make someone you<br />
          <span style={s.heroAccent}>love smile</span><br />
          in 30 seconds 💌
        </h1>

        <p style={s.heroSub}>
          Describe any card in your own words or speak it out loud.
          Sayvor's AI creates a stunning, one-of-a-kind card and delivers
          it instantly — no design skills needed.
        </p>

        <div style={s.heroBtns}>
          <a href="https://apps.apple.com" style={s.heroBtn}>
            <AppleIcon />
            Download for iOS — Free
          </a>
          <a href="#how-it-works" style={s.heroOutlineBtn}>
            See how it works →
          </a>
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          {[
            { value: '100', label: 'Founding members' },
            { value: '30s', label: 'To create a card' },
            { value: '∞', label: 'Card possibilities' },
          ].map((stat, i) => (
            <div key={i} style={s.statItem}>
              <span style={s.statValue}>{stat.value}</span>
              <span style={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Mock cards */}
        <div style={s.mockCards}>
          {[
            { emoji: '🎂', label: 'Birthday', rotate: '-8deg', delay: '0s' },
            { emoji: '❤️', label: 'Love', rotate: '-2deg', delay: '0.1s' },
            { emoji: '🎉', label: 'Holiday', rotate: '4deg', delay: '0.2s' },
            { emoji: '🎓', label: 'Graduation', rotate: '10deg', delay: '0.3s' },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                ...s.mockCard,
                transform: `rotate(${card.rotate})`,
                animationDelay: card.delay,
              }}
            >
              <span style={s.mockCardEmoji}>{card.emoji}</span>
              <span style={s.mockCardLabel}>{card.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" style={s.section}>
        <div style={s.sectionTag}>How it works</div>
        <h2 style={s.sectionTitle}>
          From idea to delivered<br />card in seconds
        </h2>
        <p style={s.sectionSub}>
          No design skills. No templates to browse. Just describe what you want.
        </p>

        <div style={s.steps}>
          {[
            {
              num: '01',
              emoji: '🎤',
              title: 'Describe your card',
              desc: 'Type or speak your idea — "a birthday card for my mom with pink roses and butterflies". The more detail the better.',
              tag: 'Voice & Text',
            },
            {
              num: '02',
              emoji: '✨',
              title: 'AI generates it instantly',
              desc: 'Sayvor creates a unique, professional-quality card in seconds using cutting-edge AI image generation.',
              tag: 'Powered by AI',
            },
            {
              num: '03',
              emoji: '💌',
              title: 'Send with a personal message',
              desc: 'Add a heartfelt note, choose to send via text, email or share a link. They open it in their browser — no app needed.',
              tag: 'Instant Delivery',
            },
          ].map((step, i) => (
            <div key={i} style={s.stepCard}>
              <div style={s.stepHeader}>
                <span style={s.stepNum}>{step.num}</span>
                <span style={s.stepTag}>{step.tag}</span>
              </div>
              <span style={s.stepEmoji}>{step.emoji}</span>
              <h3 style={s.stepTitle}>{step.title}</h3>
              <p style={s.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={s.featuresSection}>
        <div style={s.sectionTag}>Features</div>
        <h2 style={s.sectionTitle}>
          Everything you need to<br />make someone feel special
        </h2>

        <div style={s.featuresGrid}>
          {[
            {
              emoji: '🎨',
              title: 'Unlimited card styles',
              desc: 'Birthday, anniversary, holiday, graduation, thank you and more. Every card is unique.',
              big: true,
            },
            {
              emoji: '🎤',
              title: 'Voice creation',
              desc: 'Just speak your idea and Sayvor generates it.',
              big: false,
            },
            {
              emoji: '💌',
              title: 'Instant delivery',
              desc: 'Send via text, email or a shareable link.',
              big: false,
            },
            {
              emoji: '📅',
              title: 'Date reminders',
              desc: "Get notified before important dates so you never forget.",
              big: false,
            },
            {
              emoji: '📸',
              title: 'Add your photos',
              desc: 'Drop your own photo onto any card for a personal touch.',
              big: false,
            },
            {
              emoji: '✍️',
              title: 'Personal message',
              desc: 'Add a handwritten-style message on the back of every card.',
              big: false,
            },
          ].map((f, i) => (
            <div key={i} style={{
              ...s.featureCard,
              ...(f.big ? s.featureCardBig : {}),
            }}>
              <span style={s.featureEmoji}>{f.emoji}</span>
              <h3 style={s.featureTitle}>{f.title}</h3>
              <p style={s.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={s.pricingSection}>
        <div style={s.sectionTag}>Pricing</div>
        <h2 style={s.sectionTitle}>Simple, honest pricing</h2>
        <p style={s.sectionSub}>Start with a 7-day free trial. No credit card required.</p>

        <div style={s.pricingCards}>

          {/* Founder */}
          <div style={s.pricingCardFeatured}>
            <div style={s.pricingFeaturedTag}>🏆 Founders Only</div>
            <h3 style={s.pricingPlanName}>Lifetime Access</h3>
            <div style={s.pricingPrice}>
              <span style={s.pricingAmount}>$49.99</span>
              <span style={s.pricingPer}>one-time</span>
            </div>
            <p style={s.pricingDesc}>
              Pay once and use Sayvor forever. Exclusive to the first 100 members.
            </p>
            <div style={s.pricingFeatures}>
              {[
                '75 AI cards per month',
                'All card styles & categories',
                'Voice card creation',
                'Date reminders',
                'Send via SMS & Email',
                'Save to camera roll',
                'Lifetime updates',
              ].map((f, i) => (
                <div key={i} style={s.pricingFeatureRow}>
                  <span style={s.pricingCheck}>✓</span>
                  <span style={s.pricingFeatureText}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://apps.apple.com" style={s.pricingCtaFeatured}>
              Claim Founder Deal →
            </a>
            <p style={s.pricingNote}>7-day free trial included</p>
          </div>

          {/* Annual */}
          <div style={s.pricingCard}>
            <h3 style={s.pricingPlanName}>Annual</h3>
            <div style={s.pricingPrice}>
              <span style={{ ...s.pricingAmount, color: '#fff' }}>$49.99</span>
              <span style={s.pricingPer}>/year</span>
            </div>
            <p style={{ ...s.pricingDesc, color: 'rgba(255,255,255,0.4)' }}>
              $4.17/month. Cancel anytime.
            </p>
            <div style={s.pricingFeatures}>
              {[
                '75 AI cards per month',
                'All card styles',
                'Voice creation',
                'Date reminders',
                'SMS & Email sending',
              ].map((f, i) => (
                <div key={i} style={s.pricingFeatureRow}>
                  <span style={{ ...s.pricingCheck, color: 'rgba(255,255,255,0.5)' }}>✓</span>
                  <span style={{ ...s.pricingFeatureText, color: 'rgba(255,255,255,0.6)' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://apps.apple.com" style={s.pricingCta}>
              Start Free Trial →
            </a>
          </div>

        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={s.ctaBanner}>
        <h2 style={s.ctaBannerTitle}>
          Ready to make someone smile? 💌
        </h2>
        <p style={s.ctaBannerSub}>
          Join hundreds of people sending cards that actually mean something.
        </p>
        <a href="https://apps.apple.com" style={s.ctaBannerBtn}>
          <AppleIcon />
          Download Sayvor — Free
        </a>
      </section>

      {/* ── Footer ── */}
      <footer style={s.footer}>
        <div style={s.footerTop}>
          <div style={s.footerBrand}>
            <span style={s.footerLogo}>Sayvor</span>
            <p style={s.footerTagline}>
              AI-powered greeting cards that feel human.
            </p>
          </div>
          <div style={s.footerLinks}>
            <a href="/privacy" style={s.footerLink}>Privacy Policy</a>
            <a href="/terms" style={s.footerLink}>Terms of Service</a>
            <a href="mailto:hello@sayvor.app" style={s.footerLink}>Contact</a>
          </div>
        </div>
        <div style={s.footerBottom}>
          <p style={s.footerCopy}>
            © {new Date().getFullYear()} Sayvor. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#fff',
  },

  // Nav
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: 70,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'sticky' as const,
    top: 0,
    backgroundColor: 'rgba(10,10,10,0.85)',
    backdropFilter: 'blur(20px)',
    zIndex: 100,
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  navLogoText: {
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -0.5,
  },
  navLogoDot: {
    fontSize: 10,
    color: '#ff3800',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  navLink: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  navCta: {
    backgroundColor: '#ff3800',
    color: '#fff',
    padding: '10px 22px',
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 700,
  },

  // Hero
  hero: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
    padding: '100px 24px 80px',
    maxWidth: 760,
    margin: '0 auto',
  },
  heroBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,56,0,0.1)',
    border: '1px solid rgba(255,56,0,0.25)',
    borderRadius: 50,
    padding: '8px 18px',
    fontSize: 13,
    fontWeight: 600,
    color: '#ff3800',
    marginBottom: 36,
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#ff3800',
    display: 'inline-block',
    animation: 'pulse 2s infinite',
  },
  heroTitle: {
    fontSize: 'clamp(44px, 8vw, 80px)' as any,
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: -3,
    marginBottom: 28,
    color: '#fff',
  },
  heroAccent: { color: '#ff3800' },
  heroSub: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.75,
    maxWidth: 520,
    marginBottom: 44,
  },
  heroBtns: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    marginBottom: 60,
  },
  heroBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ff3800',
    color: '#fff',
    padding: '17px 36px',
    borderRadius: 50,
    fontSize: 16,
    fontWeight: 700,
    boxShadow: '0 8px 32px rgba(255,56,0,0.35)',
  },
  heroOutlineBtn: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.7)',
    padding: '17px 32px',
    borderRadius: 50,
    fontSize: 16,
    fontWeight: 600,
    border: '1px solid rgba(255,255,255,0.1)',
  },

  // Stats
  statsRow: {
    display: 'flex',
    gap: 48,
    marginBottom: 64,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: 500,
  },

  // Mock cards
  mockCards: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
  },
  mockCard: {
    width: 110,
    height: 148,
    borderRadius: 18,
    backgroundColor: '#141414',
    border: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  mockCardEmoji: { fontSize: 36 },
  mockCardLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  },

  // Sections
  section: {
    padding: '100px 40px',
    maxWidth: 1100,
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  sectionTag: {
    display: 'inline-block',
    backgroundColor: 'rgba(255,56,0,0.1)',
    border: '1px solid rgba(255,56,0,0.2)',
    borderRadius: 50,
    padding: '6px 16px',
    fontSize: 12,
    fontWeight: 700,
    color: '#ff3800',
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 'clamp(32px, 5vw, 52px)' as any,
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: -1.5,
    marginBottom: 16,
    color: '#fff',
  },
  sectionSub: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 60,
    lineHeight: 1.6,
  },

  // Steps
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
    textAlign: 'left' as const,
  },
  stepCard: {
    backgroundColor: '#111',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 28,
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepNum: {
    fontSize: 13,
    fontWeight: 800,
    color: 'rgba(255,255,255,0.15)',
    letterSpacing: 1,
  },
  stepTag: {
    backgroundColor: 'rgba(255,56,0,0.12)',
    border: '1px solid rgba(255,56,0,0.2)',
    borderRadius: 20,
    padding: '4px 12px',
    fontSize: 11,
    fontWeight: 600,
    color: '#ff3800',
  },
  stepEmoji: { fontSize: 40 },
  stepTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: -0.3,
  },
  stepDesc: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.7,
  },

  // Features
  featuresSection: {
    padding: '100px 40px',
    maxWidth: 1100,
    margin: '0 auto',
    textAlign: 'center' as const,
    backgroundColor: '#0a0a0a',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    textAlign: 'left' as const,
  },
  featureCard: {
    backgroundColor: '#111',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 24,
    padding: '28px 28px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  featureCardBig: {
    gridColumn: 'span 2',
    background: 'linear-gradient(135deg, #1a0a00 0%, #110500 100%)',
    border: '1px solid rgba(255,56,0,0.15)',
  },
  featureEmoji: { fontSize: 32, marginBottom: 4 },
  featureTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: -0.2,
  },
  featureDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.65,
  },

  // Pricing
  pricingSection: {
    padding: '100px 40px',
    maxWidth: 900,
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  pricingCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
    textAlign: 'left' as const,
  },
  pricingCardFeatured: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
    position: 'relative' as const,
    boxShadow: '0 24px 80px rgba(255,56,0,0.2)',
  },
  pricingCard: {
    backgroundColor: '#111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 28,
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  pricingFeaturedTag: {
    backgroundColor: '#ff3800',
    color: '#fff',
    borderRadius: 20,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 800,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  pricingPlanName: {
    fontSize: 22,
    fontWeight: 800,
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  pricingPrice: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 6,
    marginBottom: 4,
  },
  pricingAmount: {
    fontSize: 44,
    fontWeight: 800,
    color: '#ff3800',
    letterSpacing: -2,
    lineHeight: 1,
  },
  pricingPer: {
    fontSize: 14,
    color: '#888',
    fontWeight: 500,
    paddingBottom: 6,
  },
  pricingDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  pricingFeatures: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
    marginBottom: 8,
  },
  pricingFeatureRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  pricingCheck: {
    color: '#ff3800',
    fontWeight: 800,
    fontSize: 14,
  },
  pricingFeatureText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 500,
  },
  pricingCtaFeatured: {
    display: 'block',
    backgroundColor: '#ff3800',
    color: '#fff',
    padding: '16px 0',
    borderRadius: 50,
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'center' as const,
    marginTop: 8,
    boxShadow: '0 8px 24px rgba(255,56,0,0.3)',
  },
  pricingCta: {
    display: 'block',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    padding: '16px 0',
    borderRadius: 50,
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'center' as const,
    marginTop: 8,
    border: '1px solid rgba(255,255,255,0.1)',
  },
  pricingNote: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center' as const,
  },

  // CTA Banner
  ctaBanner: {
    margin: '0 40px 80px',
    backgroundColor: '#ff3800',
    borderRadius: 32,
    padding: '80px 40px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 20,
  },
  ctaBannerTitle: {
    fontSize: 'clamp(28px, 4vw, 48px)' as any,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -1,
    lineHeight: 1.2,
  },
  ctaBannerSub: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.75)',
    maxWidth: 480,
    lineHeight: 1.6,
  },
  ctaBannerBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    color: '#ff3800',
    padding: '18px 40px',
    borderRadius: 50,
    fontSize: 16,
    fontWeight: 800,
    marginTop: 8,
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },

  // Footer
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '48px 40px 32px',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    flexWrap: 'wrap' as const,
    gap: 32,
  },
  footerBrand: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  footerLogo: {
    fontSize: 20,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -0.5,
  },
  footerTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.3)',
    maxWidth: 240,
    lineHeight: 1.6,
  },
  footerLinks: {
    display: 'flex',
    gap: 28,
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  footerLink: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: 500,
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.04)',
    paddingTop: 24,
  },
  footerCopy: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'center' as const,
  },
}