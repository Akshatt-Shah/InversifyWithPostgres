import { IActorProducer } from "../Interfaces";
import { ActorProducer } from "../Models";
import "reflect-metadata";
import { Msg } from "../Utills";
import { injectable } from "inversify";
import { where } from "sequelize";

@injectable()
export class ActorProducerServices {
  async createActorProducer(data: IActorProducer) {
    const result = await ActorProducer.create({
      name: data.name,
      type: data.type,
    });
    return result;
  }
  async getActorProducer() {
    const data = await ActorProducer.findAll();
    return { Data: data, status: true };
  }
  async updateActorProducer(id: string, Data: IActorProducer) {
    const data = await ActorProducer.update(Data, { where: { id: id } });
    return { Data: data, status: true, message: Msg.updateData(Data.type) };
  }
  async deleteActorProducer(id: string) {
    const data: any = await ActorProducer.destroy({ where: { id: id } });
    return { Data: data, status: true, Msg: Msg.deleteData(data.type) };
  }
}
