import { NextResponse } from 'next/server'
import { processCommand } from '@/lib/ai-engine'

export async function POST(request: Request) {
  try {
    const { command } = await request.json()

    if (!command) {
      return NextResponse.json(
        { success: false, message: 'Komut boş olamaz' },
        { status: 400 }
      )
    }

    const result = await processCommand(command)

    return NextResponse.json({
      success: true,
      message: result.message,
      taskId: result.taskId,
      data: result.data
    })
  } catch (error) {
    console.error('Execute error:', error)
    return NextResponse.json(
      { success: false, message: 'Komut işlenirken hata oluştu' },
      { status: 500 }
    )
  }
}
