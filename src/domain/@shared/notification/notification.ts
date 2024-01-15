export default class Notification {
  private errors: NotificationErrorProps[] = [];

  constructor() {}

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string): string {
    const hasContext = context !== undefined;
    let errors = hasContext
      ? this.errors.filter((error) => context === error.context)
      : this.errors;

    return errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

export type NotificationErrorProps = {
  context: string;
  message: string;
};
