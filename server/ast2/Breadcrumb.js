export class Breadcrumb {
  constructor() {}

  file(file) {
    this.file = file;
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

  nextFile(nextFile) {
    this.nextFile = nextFile;
    return this;
  }
}
