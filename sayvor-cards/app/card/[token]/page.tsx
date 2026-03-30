// app/card/[token]/page.tsx
import { createClient } from '@supabase/supabase-js'
import CardViewer from './CardView'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function CardPage({
  params,
}: {
  params: { token: string }
}) {
  const { data: card, error } = await supabase
    .from('sent_cards')
    .select('*')
    .eq('share_token', params.token)
    .single()

  if (error || !card) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💌</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 8 }}>
          Card not found
        </h1>
        <p style={{ color: '#aaa', fontSize: 15 }}>
          This card may have expired or the link is invalid.
        </p>
      </div>
    )
  }

  return <CardViewer card={card} />
}