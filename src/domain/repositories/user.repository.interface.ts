import { StatusEnum } from "../entities/enums/status.enum";
import { User } from "../entities/user.entity";
import { IBaseRepository } from "./base.repository.interface";

export interface IUserRepository extends IBaseRepository<User> {
  findWithLogs: (id: string) => Promise<User>;
  updateStatus: (id: string, status: StatusEnum) => Promise<void>;
  statusToIntegrate: (amount: number) => Promise<User[]>;
  updateIntegrateWithCrm: (
    id: string,
    hasToIntegrate: boolean
  ) => Promise<void>;
}
