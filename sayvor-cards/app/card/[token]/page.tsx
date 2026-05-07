import { createClient } from '@supabase/supabase-js'
import CardViewer from './CardView'

export default async function CardPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('ENV CHECK — URL:', !!supabaseUrl, '| Service key:', !!serviceKey, '| Anon key:', !!anonKey)
  console.log('Looking up token:', token)

  const key = serviceKey ?? anonKey ?? ''

  if (!supabaseUrl || !key) {
    return <ErrorPage message="Missing environment variables" />
  }

  const supabase = createClient(supabaseUrl, key)

  const { data: card, error } = await supabase
    .from('sent_cards')
    .select('*')
    .eq('share_token', token)
    .single()

  console.log('Card found:', !!card, '| Error:', error?.message, '| Code:', error?.code)

  if (!card) {
    return <ErrorPage message={`Card not found. Token: ${token}. DB Error: ${error?.message ?? 'none'}`} />
  }

  return <CardViewer card={card} />
}

function ErrorPage({ message }: { message: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f8f8',
      fontFamily: 'sans-serif',
      gap: 12,
      padding: 24,
    }}>
      <div style={{ fontSize: 56 }}>💌</div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
        Card not found
      </h1>
      <p style={{ color: '#aaa', fontSize: 14, margin: 0, textAlign: 'center' }}>
        This link may be invalid or the card was removed.
      </p>
      {/* Debug info — remove after fixing */}
      <pre style={{
        fontSize: 11, color: '#e05a3a',
        backgroundColor: '#fff5f2', padding: 12,
        borderRadius: 8, maxWidth: 500,
        wordBreak: 'break-all', whiteSpace: 'pre-wrap',
      }}>
        {message}
      </pre>
    </div>
  )
}