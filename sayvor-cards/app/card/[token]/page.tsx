// app/card/[token]/page.tsx
import { createClient } from '@supabase/supabase-js'
import CardViewer from './CardView'

// Service role bypasses RLS — card is always readable
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function CardPage({
  params,
}: {
  params: { token: string }
}) {
  console.log('Looking up card with token:', params.token)

  const { data: card, error } = await supabase
    .from('sent_cards')
    .select('*')
    .eq('share_token', params.token)
    .single()

  console.log('Card result:', JSON.stringify(card))
  console.log('Card error:', JSON.stringify(error))

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
        gap: 12,
      }}>
        <div style={{ fontSize: 56 }}>💌</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
          Card not found
        </h1>
        <p style={{ color: '#aaa', fontSize: 14, margin: 0 }}>
          This link may be invalid or the card was removed.
        </p>
        {/* Show error in dev so we can debug */}
        {process.env.NODE_ENV === 'development' && error && (
          <pre style={{ fontSize: 11, color: '#e05a3a', maxWidth: 400, wordBreak: 'break-all' }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    )
  }

  return <CardViewer card={card} />
}