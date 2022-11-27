export abstract class Player {
  toString: () => string = () => this.name;
  protected constructor(public name: string) {}
}
