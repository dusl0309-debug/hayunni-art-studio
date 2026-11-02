import { z } from 'zod';
export const activitySchema = z.object({ kind: z.enum(['idea','message','photo','confirmation']), text: z.string().trim().min(1).max(2000), session_id: z.uuid().optional() });
export const steps = ['재료와 아이디어 탐색','색과 형태 실험','자유롭게 제작','작품 돌아보기'];
export function progress(events: {kind:string;text:string}[]) { const start=events.map(e=>e.kind).lastIndexOf('idea');const current=start>=0?events.slice(start):events;return steps.map((title,i)=>({title,done:current.some(e=>e.kind==='confirmation'&&e.text===String(i))})); }
export function curriculum(events: {kind:string;text:string}[]) {
 const ideas=events.filter(e=>e.kind==='idea').slice(-3).map(e=>e.text).join(', ');
 return ['탐색: '+(ideas||'좋아하는 재료와 주제 찾기'),'실험: 같은 주제를 다른 색과 재료로 표현하기','확장: 평면에서 입체로 새로운 방법 시도하기','회고: 마음에 드는 선택을 이야기하고 다음 주제 고르기'];
}
