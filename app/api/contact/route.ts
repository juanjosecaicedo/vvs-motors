import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: body.message,
          car_id: body.car_id || null,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating contact message:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
