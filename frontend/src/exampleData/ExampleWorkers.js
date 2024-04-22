import { WorkerType } from "../models/dictionaries/WorkerType";
import { Person } from "../models/Person";
export const exampleWorkers = [
  new Person(1, "John", "Doe", WorkerType.LABWORKER, [
    "Cultivation A",
    "Cultivation B",
  ]),
  new Person(2, "Jane", "Smith", WorkerType.LABWORKER, [
    "Cultivation C",
    "Cultivation D",
  ]),
  new Person(3, "Michael", "Johnson", WorkerType.MANAGER, ["Cultivation E"]),
];
