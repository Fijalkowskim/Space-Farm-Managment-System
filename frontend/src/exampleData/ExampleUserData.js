import { Person } from "../models/Person";
import { WorkerType } from "../models/dictionaries/WorkerType";
export const exampleUserData = new Person(
  1,
  "Buzz",
  "Astral",
  WorkerType.ADMIN,
  []
);
