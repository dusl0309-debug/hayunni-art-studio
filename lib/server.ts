import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
export async function db() {
 if(!process.env.SUPABASE_URL||!process.env.SUPABASE_ANON_KEY) throw new Error('SETUP_REQUIRED');
 const jar=await cookies();
 return createServerClient(process.env.SUPABASE_URL,process.env.SUPABASE_ANON_KEY,{cookies:{getAll:()=>jar.getAll(),setAll:items=>items.forEach(({name,value,options})=>jar.set(name,value,options))}});
}
export async function authorized() { const client=await db(); const {data:{user}}=await client.auth.getUser(); if(!user) throw new Error('UNAUTHORIZED'); return {client,user}; }
export function failure(e:unknown) { const message=e instanceof Error?e.message:''; return Response.json({error:message==='UNAUTHORIZED'?'보호자 로그인이 필요해요.':message==='SETUP_REQUIRED'?'Supabase 연결 설정이 필요해요.':'요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.'},{status:message==='UNAUTHORIZED'?401:message==='SETUP_REQUIRED'?503:500}); }
export function sameOrigin(req:Request) { return req.headers.get('origin')===new URL(req.url).origin; }
