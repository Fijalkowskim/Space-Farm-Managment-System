export class Cultivation {
  constructor(
    id,
    startDate,
    type,
    harvests,
    plants,
    stages,
    stations,
    area,
    plannedFinishDate,
    realFinishDate,
    responsibleWorkers,
    comment
  ) {
    this.id = id;
    this.startDate = startDate;
    this.type = type;
    this.harvests = harvests;
    this.plants = plants;
    this.stages = stages;
    this.stations = stations;
    this.area = area;
    this.plannedFinishDate = plannedFinishDate;
    this.realFinishDate = realFinishDate;
    this.responsibleWorkers = responsibleWorkers;
    this.comment = comment;
  }
}
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
