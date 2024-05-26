export class CultivationCreateRequest {
  constructor(startDate, plannedFinishDate, plant, comment, area, type) {
    this.startDate = startDate;
    this.plannedFinishDate = plannedFinishDate;
    this.plant = plant;
    this.comment = comment;
    this.area = area;
    this.type = type;
  }
  constructor() {
    this.startDate = new Date();
    this.plannedFinishDate = undefined;
    this.plant = undefined;
    this.comment = "";
    this.area = 0;
    this.type = undefined;
  }
}
