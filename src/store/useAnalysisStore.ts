import { create } from 'zustand';
import type { Analysis, AnswerValue } from '../models/Analysis';
import { createAnalysisId } from '../utils/createAnalysisId';
interface AnalysisStore{analysis:Analysis;setAnswer:(id:string,value:AnswerValue)=>void;reset:()=>void;}
function newAnalysis():Analysis{return{id:createAnalysisId(),version:'0.6.0-alpha',createdAt:new Date().toISOString(),answers:{}};}
export const useAnalysisStore=create<AnalysisStore>((set)=>({analysis:newAnalysis(),setAnswer:(id,value)=>set((state)=>({analysis:{...state.analysis,answers:{...state.analysis.answers,[id]:value}}})),reset:()=>set({analysis:newAnalysis()})}));
