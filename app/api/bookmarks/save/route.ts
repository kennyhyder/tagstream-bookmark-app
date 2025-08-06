// app/api/bookmarks/save/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // For now, just return success
    // We'll add Supabase after deployment
    return NextResponse.json({ 
      success: true,
      message: 'Bookmark endpoint ready',
      received: body 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}