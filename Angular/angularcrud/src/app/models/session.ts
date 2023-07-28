import { Coach } from "./coach";
import { Cours } from "./cours";

export interface Session {
    id: number;
    nom: string;
    dateHeureDebut: Date;
    dateHeureFin: Date;
    coursId: number;
    cours: Cours;
    coachId: number;
    coach: Coach;
  }