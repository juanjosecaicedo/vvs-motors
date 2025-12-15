import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("settings").select("*")

    if (error) {
      console.error("Error fetching settings:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Convert array to object for easier frontend usage: { name: value }
    const settingsObject = data.reduce((acc: any, item: any) => {
      acc[item.name] = item.value
      return acc
    }, {})

    return NextResponse.json(settingsObject)
  } catch (error: any) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // 1. Fetch existing settings to know IDs
    const { data: existingSettings, error: fetchError } = await supabase
      .from("settings")
      .select("id, name")

    if (fetchError) throw fetchError

    const existingMap = new Map(existingSettings.map((s: any) => [s.name, s.id]))
    const updates = []
    const inserts = []

    // 2. Prepare operations
    for (const [name, value] of Object.entries(body)) {
      if (existingMap.has(name)) {
        // Update existing
        updates.push(
          supabase
            .from("settings")
            .update({ value })
            .eq("id", existingMap.get(name))
        )
      } else {
        // Insert new
        inserts.push({ name, value })
      }
    }

    // 3. Execute Updates
    if (updates.length > 0) {
      await Promise.all(updates)
    }

    // 4. Execute Inserts
    if (inserts.length > 0) {
      const { error: insertError } = await supabase.from("settings").insert(inserts)
      if (insertError) throw insertError
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error saving settings:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
