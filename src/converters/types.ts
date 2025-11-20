export interface IConverter {
  toToon(input: unknown): Promise<any>;
  fromToon(input: any): Promise<any>;
}
