import { Notification } from "@/domain/@shared/notification";

export default abstract class Entity {
  public readonly notification: Notification;

  constructor() {
    this.notification = new Notification();
  }
}