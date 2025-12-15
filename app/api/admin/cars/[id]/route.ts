import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await getSupabaseServerClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("cars")
      .update({
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
        status: body.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating car:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("cars").delete().eq("id", id)

    if (error) {
      console.error("Error deleting car:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
