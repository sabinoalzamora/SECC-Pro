import './StepProgress.css';
const steps=['Inicio','Diario','Hora','Mercado','Gestión','Resultado'];
export function StepProgress({activeIndex}:{activeIndex:number}){return <div className="step-progress">{steps.map((step,index)=><div className={`step ${index<=activeIndex?'active':''}`} key={step}><span>{index+1}</span><small>{step}</small></div>)}</div>;}
