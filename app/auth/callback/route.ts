import { db } from '@/lib/server';
import { NextResponse } from 'next/server';
export async function GET(req:Request){const url=new URL(req.url);const code=url.searchParams.get('code');if(code){const client=await db();const {error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL('/',process.env.APP_URL||url.origin));}return NextResponse.redirect(new URL('/?auth=failed',process.env.APP_URL||url.origin));}
