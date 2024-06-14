export class Cultivation {
  constructor(
    id,
    startDate,
    type,
    harvests,
    plant,
    stages,
    stations,
    area,
    plannedFinishDate,
    realFinishDate,
    responsibleWorkers,
    comment
  ) {
    this.id = id;
    this.startDate = new Date(startDate);
    this.type = type;
    this.harvests = harvests;
    this.plant = plant;
    this.stages = stages;
    this.stations = stations;
    this.area = area;
    this.plannedFinishDate = new Date(plannedFinishDate);
    this.realFinishDate = new Date(realFinishDate);
    this.responsibleWorkers = responsibleWorkers;
    this.comment = comment;
  }
  static fromResponse(response) {
    return new Cultivation(
      response.id,
      response.startDate,
      response.type,
      response.harvests,
      response.plant,
      response.stages,
      response.stations,
      response.area,
      response.plannedFinishDate,
      response.realFinishDate,
      response.responsibleWorkers,
      response.comment
    );
  }
}
