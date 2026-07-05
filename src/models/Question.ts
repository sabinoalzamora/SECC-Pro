export type Phase = 'daily' | 'hourly' | 'market' | 'management';
export interface Question { id:string; phase:Phase; group:string; tag:string; title:string; description?:string; mandatory?:boolean; warning?:boolean; weight:number; }
