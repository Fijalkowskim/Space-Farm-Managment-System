import { Cultivation } from "../models/Cultivation";
export const exampleCultivations = [
  new Cultivation(
    1,
    new Date(),
    "Type 1",
    [], // Harvests
    ["Sunflower", "Carrot"], // Plants
    [], // Stages
    [], // Stations
    10.5,
    new Date(),
    new Date(),
    [], // Responsible workers
    "Dummy comment 1"
  ),
  new Cultivation(
    2,
    new Date(),
    "Type 2",
    [], // Harvests
    ["Potato"], // Plants
    [], // Stages
    [], // Stations
    15.2,
    new Date(),
    new Date(),
    [], // Responsible workers
    "Dummy comment 2"
  ),
];
