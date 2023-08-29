import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { BaseRepository } from "./base.repository";
import { StatusEnum } from "../../domain/entities/enums/status.enum";
import { Log } from "../../domain/entities/log.entity";

export class UserRepository extends BaseRepository implements IUserRepository {
  private entity;

  constructor() {
    super();
    this.entity = new PrismaClient().user;
  }

  async find(id: string) {
    return (await this.entity.findFirst({
      where: {
        id,
      },
    })) as User;
  }

  async create(entity: User) {
    return (await this.entity.create({
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
    })) as User;
  }

  async findAll() {
    return (await this.entity.findMany()) as Array<User>;
  }

  async findWithLogs(id: string) {
    const data = await this.entity.findFirst({
      include: {
        logs: true,
      },
      where: {
        id,
      },
    });

    return new User({
      id: data?.id,
      name: data?.name,
      email: data?.email,
      password: data?.password,
      status: data?.status as StatusEnum,
      logs: data?.logs as Array<Log>,
    });
  }

  async updateStatus(id: string, status: StatusEnum) {
    await this.entity.update({
      data: {
        status,
        hasToIntegrate: true,
      },
      where: {
        id,
      },
    });
  }

  async statusToIntegrate(amount: number) {
    return (await this.entity.findMany({
      where: {
        hasToIntegrate: true,
      },
      take: amount,
    })) as User[];
  }

  async updateIntegrateWithCrm(id: string, hasToIntegrate: boolean) {
    await this.entity.update({
      data: {
        hasToIntegrate,
      },
      where: {
        id,
      },
    });
  }
}
