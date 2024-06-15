export class CultivationRequest {
  constructor(
    startDate = new Date(),
    plannedFinishDate = undefined,
    realFinishDate = undefined,
    plant = undefined,
    comment = "",
    area = 0,
    type = undefined
  ) {
    this.startDate = startDate;
    this.plannedFinishDate = plannedFinishDate;
    this.realFinishDate = realFinishDate;
    this.plant = plant;
    this.comment = comment;
    this.area = area;
    this.type = type;
  }
}
