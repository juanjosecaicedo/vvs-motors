import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    // Get total cars
    const { count: totalCars } = await supabase.from("cars").select("*", { count: "exact", head: true })

    // Get available cars
    const { count: availableCars } = await supabase
      .from("cars")
      .select("*", { count: "exact", head: true })
      .eq("status", "available")

    // Get sold cars
    const { count: soldCars } = await supabase
      .from("cars")
      .select("*", { count: "exact", head: true })
      .eq("status", "sold")

    // Get pending messages
    const { count: pendingMessages } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    return NextResponse.json({
      totalCars: totalCars || 0,
      availableCars: availableCars || 0,
      soldCars: soldCars || 0,
      pendingMessages: pendingMessages || 0,
    })
  } catch (error: any) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
