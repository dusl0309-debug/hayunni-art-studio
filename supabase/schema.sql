-- Run in the Supabase SQL editor. Use a dedicated project for this family.
create table if not exists public.events (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 kind text not null check (kind in ('idea','message','photo','confirmation','coach')),
 text text not null check (char_length(text) between 1 and 12000),
 session_id uuid,
 photo_path text,
 created_at timestamptz not null default now()
);
create index if not exists events_owner_time on public.events(owner_id,created_at);
alter table public.events enable row level security;
create policy "owner reads" on public.events for select to authenticated using (owner_id=auth.uid());
create policy "owner inserts" on public.events for insert to authenticated with check (owner_id=auth.uid());
create policy "owner deletes" on public.events for delete to authenticated using (owner_id=auth.uid());
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('artworks','artworks',false,4194304,array['image/jpeg','image/png','image/webp']) on conflict(id) do update set public=false,file_size_limit=4194304,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
create policy "private photo read" on storage.objects for select to authenticated using (bucket_id='artworks' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "private photo insert" on storage.objects for insert to authenticated with check (bucket_id='artworks' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "private photo delete" on storage.objects for delete to authenticated using (bucket_id='artworks' and (storage.foldername(name))[1]=auth.uid()::text);
