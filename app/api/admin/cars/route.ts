import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false })

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

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const body = await request.json()

    console.log("Creating new car:", body)

    const { data, error } = await supabase
      .from("cars")
      .insert([
        {
          brand: body.brand,
          model: body.model,
          year: Number(body.year),
          price: Number(body.price),
          transmission: body.transmission,
          fuel_type: body.fuel_type,
          engine: body.engine,
          mileage: body.mileage ? Number(body.mileage) : 0,
          color: body.color || null,
          description: body.description || null,
          image_url: body.image_url || null,
          featured: body.featured || false,
          status: body.status || "available",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating car:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("Car created successfully:", data)
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
