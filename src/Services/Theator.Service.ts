import { injectable } from "inversify";
import { Itheator } from "../Interfaces";
import { Theator } from "../Models";
import { Msg } from "../Utills";
@injectable()
export class TheatorService {
  async createTheator(Data: Itheator) {
    // console.log(Data)
    const TheatorData = await Theator.create({
      name: Data.name,
      location: Data.location,
      ownerId: Data.ownerId,
    });
    return {
      Data: TheatorData,
      message: Msg.createData("Theator"),
      status: true,
    };
  }

  async getTheator(Id?: string, Role?: string) {
    if (Role === "Theator-Admin") {
      const movieData = await Theator.findOne({ where: { OwnerId: Id } });
      return {
        Data: movieData,
        message: Msg.getData("Theator"),
        status: true,
      };
    } else {
      const movieData = await Theator.findAll();
      return {
        Data: movieData,
        message: Msg.getData("Theator"),
        status: true,
      };
    }
  }

  async updateTheator(Data: Itheator, TheatorId?: string) {
    const TheatorData = await Theator.update(Data, {
      where: { id: TheatorId },
    });
    return {
      Data: TheatorData,
      message: Msg.updateData("Theator"),
      status: true,
    };
  }

  async deleteTheator(TheatorId: string, Id?: string) {
    const movieData = await Theator.destroy({
      where: {
        ownerId: Id,
        id: TheatorId,
      },
    });
    return {
      Data: movieData,
      message: Msg.deleteData("Theator"),
      status: true,
    };
  }
}
