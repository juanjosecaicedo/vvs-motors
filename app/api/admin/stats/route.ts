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

    // Get total revenue (sum of prices of available cars)
    // Note: Using client-side aggregation due to lack of SQL function here.
    const { data: priceRows, error: priceError } = await supabase
      .from("cars")
      .select("price")
      .eq("status", "available")

    if (priceError) {
      console.error("Error fetching prices:", priceError)
    }

    const totalRevenue = (priceRows || []).reduce((acc: number, row: any) => acc + Number(row.price || 0), 0)

    return NextResponse.json({
      totalCars: totalCars || 0,
      availableCars: availableCars || 0,
      soldCars: soldCars || 0,
      pendingMessages: pendingMessages || 0,
      totalRevenue,
    })
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
