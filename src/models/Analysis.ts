export type AnswerValue = boolean | 'notin' | 'none' | 'alert' | 'confirm' | null;
export interface Analysis { id:string; version:string; createdAt:string; ticker?:string; answers:Record<string, AnswerValue>; }
