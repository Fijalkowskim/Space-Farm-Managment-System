export class CultivationRequest {
  constructor(
    startDate = new Date(),
    plannedFinishDate = undefined,
    plant = undefined,
    comment = "",
    area = 0,
    type = undefined
  ) {
    this.startDate = startDate;
    this.plannedFinishDate = plannedFinishDate;
    this.plant = plant;
    this.comment = comment;
    this.area = area;
    this.type = type;
  }
}
