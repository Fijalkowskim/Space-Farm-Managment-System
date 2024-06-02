export class ReadingRequest {
  constructor(value = 0, measuredValueId, controlId) {
    this.measuredValueId = measuredValueId;
    this.controlId = controlId;
    this.value = value;
  }
}
