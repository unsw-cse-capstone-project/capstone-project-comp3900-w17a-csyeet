export class IdGenerator {
  private idCount: number = 0;

  next() {
    return this.idCount++;
  }
}