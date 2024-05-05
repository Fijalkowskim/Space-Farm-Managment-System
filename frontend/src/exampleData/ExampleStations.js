import { Station } from "../models/Station";
import { exampleCultivations } from "./ExampleCultivations";
export const exampleStations = [
  new Station(1, [exampleCultivations[0]]),
  new Station(2, [exampleCultivations[1], exampleCultivations[2]]),
  new Station(3, []),
  new Station(4, []),
];
