import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const { searchParams } = new URL(request.url)

    const brand = searchParams.get("brand")
    const transmission = searchParams.get("transmission")
    const fuel_type = searchParams.get("fuel_type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "created_at"
    const order = searchParams.get("order") || "desc"

    let query = supabase.from("cars").select("*").eq("status", "available")

    if (brand) query = query.ilike("brand", `%${brand}%`)
    if (transmission) query = query.eq("transmission", transmission)
    if (fuel_type) query = query.eq("fuel_type", fuel_type)
    if (minPrice) query = query.gte("price", Number(minPrice))
    if (maxPrice) query = query.lte("price", Number(maxPrice))

    query = query.order(sortBy, { ascending: order === "asc" })

    const { data, error } = await query

    if (error) {
      console.error("[v0] Error fetching cars:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
