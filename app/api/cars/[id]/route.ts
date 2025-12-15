import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase.from("cars").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching car:", error)
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
