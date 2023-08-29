import { BaseEntity } from "./base.entity";
import { StatusEnum } from "./enums/status.enum";
import { Log } from "./log.entity";

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  status?: StatusEnum;
  logs?: Array<Log>;
  hasToIntegrate?: boolean;
}

export class User extends BaseEntity {
  constructor(user: IUser) {
    super();
    this.id = user.id ?? "";
    this.name = user.name ?? "";
    this.email = user.email ?? "";
    this.password = user.password ?? "";
    this.status = user.status ?? StatusEnum.Registered;
    this.logs = user.logs ?? [];
    this.hasToIntegrate = user.hasToIntegrate ?? true;
  }

  public name!: string;
  public email!: string;
  public password!: string;
  public status!: StatusEnum;
  public logs!: Array<Log>;
  public hasToIntegrate!: boolean;

  async changeUserStatus(newStatus: StatusEnum) {
    const log = new Log({
      from: this.status,
      to: newStatus,
      userId: this.id,
    });
    this.logs.push(log);
    this.status = newStatus;
    this.hasToIntegrate = true;
    return log;
  }
}
