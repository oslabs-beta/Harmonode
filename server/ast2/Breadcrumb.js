export class Breadcrumb {
  constructor() {
    this.nextFile;
  }

  fileName(fileName) {
    this.fileName = fileName;
    return this;
  }

  path(path) {
    this.path = path;
    return this;
  }

  method(method) {
    this.method = method;
    return this;
  }
}
