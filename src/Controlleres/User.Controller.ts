import { NextFunction, Request, Response } from "express";
import { IUser } from "../Interfaces";
import { UserServices } from "../Services";
import {
  httpGet,
  httpDelete,
  httpPost,
  httpPut,
  controller,
} from "inversify-express-utils";
import bcrypt from "bcrypt";
import Jwt = require("jsonwebtoken");
import { inject } from "inversify";
import { TYPES } from "../Types/types";
import { NewRequest } from "../Interfaces";

@controller("/api/user")
export class UserController {
  constructor(@inject(TYPES.UserServices) private UserServices: UserServices) {}

  @httpPost("/createUser")
  public async CreateUser(req: Request, res: Response,next: NextFunction) {
    try {
      const userData: IUser = req.body;
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      const user = await this.UserServices.CreateUser(userData);
      res.send(user);
    } catch (error: any) {
      // res
      //   .status(error.status)
      //   .json({ message: error.message, statusbar: error.status });
      next(error)
    }
  }

  @httpGet("/getUser")
  async getAllUser(req: Request, res: Response) {
    try {
      const UserData = await this.UserServices.getAllUser();
      //   console.log(UserData);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
  @httpPost("/loginUser")
  async loginUser(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      const UserData = await this.UserServices.loginUser(email, password);
      res.cookie("UserToken", UserData.Token);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
  @httpPut("/updateUser",TYPES.VerifyToken)
  async UpdateUser(req: NewRequest, res: Response) {
    try {
      let Data: IUser = req.body;
      Data.password = await bcrypt.hash(Data.password, 10);
      const { userId } = req;
      console.log(userId);
      const UserData = await this.UserServices.UpdateUser(Data, userId);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
  @httpDelete("/deleteUser",TYPES.VerifyToken)
  async deleteUser(req: NewRequest, res: Response) {
    try {
      const { userId } = req;
      const UserData = await this.UserServices.deleteUser(userId);
      res.status(200).json(UserData);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
}
