export default function Terms() {
    return (
      <main style={s.container}>
        <nav style={s.nav}>
          <a href="/" style={s.logo}>Sayvor ✦</a>
        </nav>
  
        <div style={s.content}>
          <h1 style={s.title}>Terms of Service</h1>
          <p style={s.updated}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
  
          {[
            {
              heading: 'Acceptance of Terms',
              body: `By downloading or using Sayvor, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.`,
            },
            {
              heading: 'Description of Service',
              body: `Sayvor is an AI-powered greeting card creation and delivery service. Users can create digital greeting cards using AI image generation, add personal messages, and share cards via links through SMS, email, or other messaging platforms.`,
            },
            {
              heading: 'User Accounts',
              body: `You must create an account to use Sayvor. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account. You must provide accurate information when creating your account.`,
            },
            {
              heading: 'Acceptable Use',
              body: `You agree not to use Sayvor to create or send content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable. You may not use the service to spam recipients or send unsolicited messages. Sayvor reserves the right to terminate accounts that violate these terms.`,
            },
            {
              heading: 'AI-Generated Content',
              body: `Cards created using Sayvor's AI generation feature are unique to your prompts. You retain ownership of the cards you create. By using the service, you grant Sayvor a limited license to store and display your cards as necessary to provide the service.`,
            },
            {
              heading: 'Payments and Subscriptions',
              body: `Sayvor offers a 7-day free trial for all paid plans. After the trial period, your selected plan will automatically renew unless cancelled. Founder lifetime access is a one-time payment with no recurring charges. All payments are processed securely through Stripe. Refunds are handled on a case-by-case basis — contact hello@sayvor.app.`,
            },
            {
              heading: 'Limitation of Liability',
              body: `Sayvor is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you paid for the service in the past 12 months.`,
            },
            {
              heading: 'Changes to Terms',
              body: `We may update these Terms of Service from time to time. We will notify you of significant changes via email or in-app notification. Continued use of the service after changes constitutes acceptance of the new terms.`,
            },
            {
              heading: 'Contact',
              body: `For questions about these Terms of Service, contact us at hello@sayvor.app.`,
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