export function aiFailure(error: unknown): {error:string;status:number} | undefined {
 const e=error as {status?:number;code?:string;name?:string};
 if(e?.status===401)return {status:502,error:'OpenAI API 키를 확인해 주세요. Vercel의 OPENAI_API_KEY를 새 키로 저장하고 Redeploy한 뒤 다시 시도해 주세요.'};
 if(e?.code==='insufficient_quota')return {status:503,error:'OpenAI API 사용 잔액 또는 결제 한도를 확인해 주세요. ChatGPT 구독과 API 결제는 별도예요.'};
 if(e?.status===429)return {status:429,error:'AI 요청이 몰려 잠시 답하지 못했어요. 잠시 후 답변 다시 받기를 눌러 주세요.'};
 if(e?.status===403||e?.status===404)return {status:502,error:'OpenAI 프로젝트의 모델 사용 권한과 OPENAI_MODEL 설정을 확인해 주세요.'};
 if(e?.name==='APIConnectionTimeoutError'||e?.name==='APIConnectionError')return {status:504,error:'AI 연결 시간이 길어졌어요. 질문은 저장됐으니 답변 다시 받기를 눌러 주세요.'};
 if(e?.status&&e.status>=500)return {status:502,error:'AI 서비스가 잠시 응답하지 않아요. 잠시 후 답변 다시 받기를 눌러 주세요.'};
}
