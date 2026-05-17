import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Uses service role key — never exposed to browser
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 })
    }

    // Find user by email using admin API
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) throw listError

    const user = users.find(u => u.email?.toLowerCase() === email.trim().toLowerCase())

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with that email address.' },
        { status: 404 }
      )
    }

    // Update password directly — no session needed
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password }
    )

    if (updateError) throw updateError

    return NextResponse.json({ success: true })

  } catch (e: any) {
    console.error('Reset error:', e)
    return NextResponse.json({ error: e.message ?? 'Something went wrong.' }, { status: 500 })
  }
}