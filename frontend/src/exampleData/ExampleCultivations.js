import { Cultivation } from "../models/Cultivation";
export const exampleCultivations = [
  new Cultivation(
    1,
    new Date("2022-12-17T00:00:00"),
    "Type 1",
    [], // Harvests
    "Sunflower", // Plant
    [], // Stages
    [], // Stations
    10.5,
    new Date("2046-12-17T00:00:00"),
    undefined,
    [], // Responsible workers
    "Dummy comment 1"
  ),
  new Cultivation(
    2,
    new Date("2023-03-11T00:00:00"),
    "Type 2",
    [], // Harvests
    "Potato", // Plant
    [], // Stages
    [], // Stations
    15.2,
    new Date("2024-06-06T00:00:00"),
    undefined,
    [], // Responsible workers
    "Dummy comment 2"
  ),
  new Cultivation(
    3,
    new Date("2023-01-13T00:00:00"),
    "Type 2",
    [], // Harvests
    "Lettuce", // Plant
    [], // Stages
    [], // Stations
    2.3,
    new Date("2025-09-09T00:00:00"),
    undefined,
    [], // Responsible workers
    undefined
  ),
];
export const exampleFinishedCultivations = [
  new Cultivation(
    4,
    new Date("2022-11-23T00:00:00"),
    "Type 3",
    [], // Harvests
    "Carrot", // Plant
    [], // Stages
    [], // Stations
    3,
    new Date("2024-02-02T00:00:00"),
    new Date("2024-02-02T00:00:00"),
    [], // Responsible workers
    "Dummy comment 3"
  ),
];
