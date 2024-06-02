export class StageRequest {
  constructor(
    stageType,
    startStageDate = new Date(),
    finishStageDate,
    comment = "",
    controls,
    cultivationId
  ) {
    this.stageType = stageType;
    this.startStageDate = startStageDate;
    this.finishStageDate = finishStageDate;
    this.comment = comment;
    this.controls = controls;
    this.cultivationId = cultivationId;
  }
}
