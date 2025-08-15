import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 })
    }

    // TODO: Replace with real JWT verification
    // For now, just return a mock user
    const mockUser = {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(mockUser)
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
}
