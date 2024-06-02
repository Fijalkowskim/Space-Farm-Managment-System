export class HarvestRequest {
  constructor(harvestDate, successfulHarvest, comment, cultivationId) {
    this.harvestDate = harvestDate;
    this.successfulHarvest = successfulHarvest;
    this.comment = comment;
    this.cultivationId = cultivationId;
  }
}
