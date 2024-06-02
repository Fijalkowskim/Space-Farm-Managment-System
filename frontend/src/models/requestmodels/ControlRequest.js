export class ControlRequest {
  constructor(controlDate = new Date(), deadSeedlings = 0, readings, stageId) {
    this.controlDate = controlDate;
    this.deadSeedlings = deadSeedlings;
    this.readings = readings;
    this.stageId = stageId;
  }
}
