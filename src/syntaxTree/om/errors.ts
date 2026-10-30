export class InvalidConfigurationException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidConfigurationException";
  }
}
