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