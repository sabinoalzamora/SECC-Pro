import type { Question } from '../../models/Question';
import type { AnswerValue } from '../../models/Analysis';
import './QuestionCard.css';
export function QuestionCard({question,value,onChange}:{question:Question;value:AnswerValue;onChange:(value:boolean)=>void}){return <article className={`question-card ${question.mandatory?'mandatory':''} ${question.warning?'warning':''}`}><div className="question-tag">{question.tag}</div><div className="question-body"><h3>{question.title}</h3>{question.description?<p>{question.description}</p>:null}</div><div className="question-actions"><button className={value===true?'selected yes':''} onClick={()=>onChange(true)}>Sí</button><button className={value===false?'selected no':''} onClick={()=>onChange(false)}>No</button></div></article>;}
