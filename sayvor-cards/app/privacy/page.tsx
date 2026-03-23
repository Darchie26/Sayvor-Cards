export default function Privacy() {
    return (
      <main style={s.container}>
        <nav style={s.nav}>
          <a href="/" style={s.logo}>Sayvor ✦</a>
        </nav>
  
        <div style={s.content}>
          <h1 style={s.title}>Privacy Policy</h1>
          <p style={s.updated}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
  
          {[
            {
              heading: 'Information We Collect',
              body: `We collect information you provide when creating an account, including your name and email address. When you create and send greeting cards, we store the card image, your personal message, and recipient information you provide. We also collect usage data to improve our service.`,
            },
            {
              heading: 'How We Use Your Information',
              body: `We use your information to provide and improve the Sayvor service, deliver cards to recipients via the share links you create, send you reminders about important dates you've added, and communicate with you about your account and our service.`,
            },
            {
              heading: 'Information Sharing',
              body: `We do not sell your personal information to third parties. Cards you send are accessible via unique share links — only people with the link can view the card. We use Supabase for data storage, Fal.ai for AI image generation, and Stripe for payment processing. Each of these services has their own privacy policy.`,
            },
            {
              heading: 'Data Retention',
              body: `We retain your account information for as long as your account is active. Sent cards are stored indefinitely so recipients can always access them. You can delete your cards at any time from the My Cards section of the app.`,
            },
            {
              heading: 'Your Rights',
              body: `You have the right to access, update, or delete your personal information at any time. To request deletion of your account and all associated data, please contact us at hello@sayvor.app.`,
            },
            {
              heading: 'Security',
              body: `We implement industry-standard security measures to protect your information. All data is transmitted over HTTPS and stored securely using Supabase with row-level security policies.`,
            },
            {
              heading: 'Contact Us',
              body: `If you have any questions about this Privacy Policy, please contact us at hello@sayvor.app.`,
            },
          ].map((section, i) => (
            <div key={i} style={s.section}>
              <h2 style={s.heading}>{section.heading}</h2>
              <p style={s.body}>{section.body}</p>
            </div>
          ))}
        </div>
  
        <footer style={s.footer}>
          <a href="/" style={s.footerLink}>← Back to Sayvor</a>
        </footer>
      </main>
    )
  }
  
  const s: Record<string, React.CSSProperties> = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    },
    nav: {
      padding: '20px 40px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    logo: {
      fontSize: 20,
      fontWeight: 800,
      color: '#fff',
      textDecoration: 'none',
      letterSpacing: -0.3,
    },
    content: {
      maxWidth: 680,
      margin: '0 auto',
      padding: '60px 24px 80px',
    },
    title: {
      fontSize: 40,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -1,
      marginBottom: 8,
    },
    updated: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.3)',
      marginBottom: 48,
    },
    section: {
      marginBottom: 36,
      paddingBottom: 36,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    heading: {
      fontSize: 20,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: -0.3,
      marginBottom: 12,
    },
    body: {
      fontSize: 15,
      color: 'rgba(255,255,255,0.55)',
      lineHeight: 1.8,
      margin: 0,
    },
    footer: {
      padding: '32px 40px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    },
    footerLink: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.35)',
      textDecoration: 'none',
    },
  }