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
    const year = searchParams.get("year")
    const search = searchParams.get("search")
    const model = searchParams.get("model")

    let query = supabase.from("cars").select("*").eq("status", "available")

    if (brand && brand !== "all") query = query.ilike("brand", `%${brand}%`)
    if (search) {
      // OR logic for search term across brand and model
      // Note: Supabase/PostgREST syntax for OR with ilike is slightly complex in raw strings,
      // but client library supports .or()
      query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%`)
    }
    if (model) query = query.ilike("model", `%${model}%`)
    if (year && year !== "all") query = query.eq("year", parseInt(year))
    if (transmission && transmission !== "all") query = query.eq("transmission", transmission)
    if (fuel_type && fuel_type !== "all") query = query.eq("fuel_type", fuel_type)
    if (minPrice) query = query.gte("price", Number(minPrice))
    if (maxPrice) query = query.lte("price", Number(maxPrice))

    query = query.order(sortBy, { ascending: order === "asc" })

    const { data, error } = await query

    if (error) {
      console.error("Error fetching cars:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
