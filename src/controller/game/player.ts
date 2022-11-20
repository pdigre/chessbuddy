export abstract class Player {
  name: string;
  abstract toString: () => string;

  protected constructor(name: string) {
    this.name = name;
  }
}
