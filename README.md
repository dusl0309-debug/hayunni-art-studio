# 하연이의 아틀리에

Next.js App Router / Supabase Auth·Postgres·Private Storage / OpenAI Responses API 기반 가족 미술 스튜디오 MVP.

## 실행

Node.js 24 LTS에서 검증. `npm ci`, `.env.example`을 참고하여 `.env.local` 설정 후 `npm run dev`.
`npm test`, `npm run typecheck`, `npm run build`로 검증하고 `npm start`로 운영 모드 실행.
환경변수는 전부 서버 전용이며 `NEXT_PUBLIC_` 접두사를 사용하지 않습니다. 서비스 역할 키는 사용하지 않습니다.

## Supabase

1. 프로젝트 SQL Editor에서 `supabase/schema.sql`을 한 번 실행합니다. RLS가 가족 계정별 데이터 접근을 제한하고 artworks 버킷은 private입니다.
2. Auth URL Configuration에 실제 서비스 도메인을 Site URL로 설정하고 `https://도메인/auth/callback`을 Redirect URL에 등록합니다. 로컬은 `http://localhost:3000/auth/callback`.
3. 보호자 이메일 로그인 링크를 사용합니다. 가족 전용 운영 시 가입 허용 이메일/초대 정책과 이메일 전송 SMTP를 Supabase에서 관리하세요. 각 로그인 계정은 독립 공간이며 가족 간 초대·공유는 미구현입니다.
4. 서버에 `SUPABASE_URL`, `SUPABASE_ANON_KEY`를 설정합니다. 사용자 JWT와 RLS를 이용하므로 anon key로 다른 가족 기록을 읽을 수 없습니다.

## Vercel 배포

저장소를 Import하고 프로젝트 루트를 이 디렉터리, 프레임워크를 Next.js로 선택합니다. Node.js 24.x, 빌드 `npm run build`.
환경변수 `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `OPENAI_API_KEY`, `OPENAI_MODEL=gpt-4.1-mini`, `APP_URL=https://실제도메인`을 서버 환경에 등록합니다. Preview와 Production 각각 URL 및 Supabase redirect allowlist를 맞추세요. 비밀값을 저장소에 커밋하지 마세요.
OpenAI API 비용 한도와 Supabase Auth rate limits를 설정하세요. AI 요청은 최근 30개 기록과 동의한 최신 사진만 전송하며 `store:false`입니다. 제공자의 별도 보관 정책은 따로 확인해야 합니다.

## 구현 범위와 교육 원칙

자유 주제 선택, 과정 사진 업로드, 대화와 AI 응답 자동 저장, 비공개 사진 조회(60초 signed URL), 보호자 단계 확인·전체 기록 삭제, 관심 주제 기반 4단계 순환 커리큘럼, 작품 기록, iPad 반응형 화면, PWA manifest와 오프라인 재료 안내를 구현했습니다.
`lib/education.ts`에 현재 대화에서 확인한 교육 기준을 모았습니다. 기존 프로젝트/이전 대화는 제공되지 않아 그 내용까지 반영했다고 주장하지 않습니다.
AI의 판단이나 사진 업로드만으로 단계는 완료되지 않습니다. 보호자가 관찰 후 확인한 단계만 별도로 표시합니다. 과거 작품은 선택 기록이며 시작 과제가 아닙니다.

## 개인정보 및 현재 한계

사진과 대화는 온라인에서만 저장하며 오프라인 업로드 대기열과 기기 개인 정보 캐시는 없습니다. 서비스 워커는 개인정보가 없는 offline.html만 저장합니다. iPad Safari에서 공유 → 홈 화면에 추가로 설치할 수 있습니다. 사진은 4MB 이하 JPG/PNG/WebP이며 HEIC는 변환 후 올려야 합니다. 운영 전 실제 iPad에서 설치/사진 선택과 접근성을 확인하세요.
AI 사진 전송 동의는 탭 메모리의 보호자 체크이며 강한 보호자 PIN/별도 역할이나 동의 감사 기록은 아직 없습니다. 운영 전 보호자 전용 역할 및 서버에 저장되는 철회 가능한 동의, 요청별 원자적 사용량 제한을 추가하는 것이 권장됩니다. 현재 AI 재시도는 10초 간격 확인이며 동시 요청을 완전히 차단하지 않습니다.
데이터는 최근 조회 500개, AI 문맥 30개로 제한됩니다. 커리큘럼은 관심 주제 기반 순환 제안으로, 월별 AI 계획의 영구 저장·수업별 세션 분리·개별 기록 수정/삭제·데이터 내보내기는 아직 미구현입니다. 전체 기록 삭제는 Storage 삭제 후 DB 삭제하므로 실패 시 재시도해야 합니다. 계정 자체 삭제는 Supabase 관리 기능을 사용하세요.

## 실제 서비스 검증 체크리스트

환경변수 설정 후 두 보호자 계정으로 교차 조회/삭제 차단, 이메일 콜백, 사진 업로드·signed URL 만료, AI 사진 피드백과 미동의 차단, 기록 재접속 복원, 전체 삭제, iPad PWA 오프라인 안내를 확인합니다. 외부 자격증명 없이 실행한 빌드/단위 테스트만으로 실서비스 통합이 검증된 것은 아닙니다.
