import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import CardView from './CardView'

type Props = { params: { token: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: card } = await supabase
    .from('sent_cards')
    .select('image_url, recipient_name, message')
    .eq('share_token', params.token)
    .single()

  const title = card?.recipient_name
    ? `A card for ${card.recipient_name} 💌`
    : 'Someone sent you a card 💌'

  return {
    title,
    description: card?.message ?? 'Open to see your beautiful AI card made with Sayvor',
    openGraph: {
      title,
      description: card?.message ?? 'Open to see your card',
      images: card?.image_url
        ? [{ url: card.image_url, width: 800, height: 1067 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: card?.image_url ? [card.image_url] : [],
    },
  }
}

export default async function CardPage({ params }: Props) {
  const { data: card } = await supabase
    .from('sent_cards')
    .select('*')
    .eq('share_token', params.token)
    .single()

  // Track view
  if (card) {
    await supabase
      .from('sent_cards')
      .update({
        view_count: (card.view_count ?? 0) + 1,
        viewed_at: new Date().toISOString(),
      })
      .eq('share_token', params.token)
  }

  return <CardView card={card} />
}