import { axiosServerInstance } from '@/src/lib/axiosInstance';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  
  try {
    const response = await axiosServerInstance.get(
      `/data/top/price?limit=${limit}&tsym=USD&page=${page}`
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in tokens API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
} 