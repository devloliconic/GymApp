import { Coach } from "./coach";
import { SimpleGym } from "./gym";
import { User } from "./user";

export type Workout = {
  workout_id: number;
  client_id: number;
  coach_id: number;
  gym_id: number;
  user: User;
  coach: Coach;
  date: string;
  gym: SimpleGym;
};
