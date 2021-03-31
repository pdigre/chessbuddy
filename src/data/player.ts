export abstract class Player {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract toString: () => string;
}
