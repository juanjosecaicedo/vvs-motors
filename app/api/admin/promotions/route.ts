import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("promotions")
      .insert([
        {
          title: body.title,
          description: body.description,
          discount_value: body.discount_value,
          icon: body.icon || "🎉",
          active: body.active ?? true,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error("Error creating promotion:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
