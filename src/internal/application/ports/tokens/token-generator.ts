export interface ITokenGenerator {
  generate(payload: unknown): string;
}
