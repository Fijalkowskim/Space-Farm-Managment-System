import { Plant } from "../models/Plant";
import { exampleCultivations } from "./ExampleCultivations";

export const examplePlants = [
  new Plant(1, "Sunflower", [exampleCultivations[0], exampleCultivations[1]]),
  new Plant(2, "Potato", [exampleCultivations[1], exampleCultivations[2]]),
  new Plant(3, "Weed", [exampleCultivations[0], exampleCultivations[2]]),
];
