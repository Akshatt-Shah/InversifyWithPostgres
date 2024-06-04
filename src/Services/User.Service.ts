import { User } from "../Models";
import { Sequelize } from "sequelize";
import { IUser } from "../Interfaces";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { injectable } from "inversify";
import "reflect-metadata";
import { Msg } from "../Utills";

@injectable()
export class UserServices {
  async CreateUser(userData: IUser): Promise<any> {
    const Data = await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });

    return { Data: Data, message: Msg.createData("User"), status: true };
  }

  async getAllUser() {
    const data = await User.findAll();
    //   console.log(data); // Ensure data is being logged
    return { Data: data, status: true };
  }

  async UpdateUser(Data: IUser, id?: string) {
    console.log(id);

    const data = await User.update(Data, {
      where: {
        id: id,
      },
    });

    return { Data: data, status: true };
  }
  async deleteUser(id?: string) {
    const data = await User.destroy({
      where: {
        id: id,
      },
    });

    return { message: "Record Deleted Successfully", status: true };
  }
  async loginUser(email: string, password: string) {
    const data: any = await User.findOne({ where: { email: email } });
    const Compare = await bcrypt.compare(password, data.password);
    if (Compare) {
      const Token = await Jwt.sign(
        { UserId: data.id, UserRole: data.role },
        "Akshat",
        {
          expiresIn: "24h",
        }
      );
      return { message: "Login Successfull", Token: Token, status: true };
    } else {
      return { message: "Incorrect Password", status: true };
    }
  }
}
