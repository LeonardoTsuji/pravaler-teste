import { BaseEntity } from "./base.entity";
import { StatusEnum } from "./enums/status.enum";
import { User } from "./user.entity";

interface ILog {
  from: StatusEnum;
  to: StatusEnum;
  userId: string;
}

export class Log extends BaseEntity {
  constructor(log: ILog) {
    super();
    this.from = log.from;
    this.to = log.to;
    this.userId = log.userId;
    this.createdAt = new Date();
  }

  public from!: StatusEnum;
  public to!: StatusEnum;
  public userId!: string;
  public User!: User;
}
