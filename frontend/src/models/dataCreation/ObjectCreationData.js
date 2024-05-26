export class ObjectCreationData {
  constructor(object, createMethod, navigateAfterCreating, objectType) {
    this.object = object;
    this.createMethod = createMethod;
    this.navigateAfterCreating = navigateAfterCreating;
    this.objectType = objectType;
  }
}
