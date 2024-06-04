import { inject } from "inversify";
import { Itheator, NewRequest } from "../Interfaces";
import { TheatorService } from "../Services";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../Types/types";
@controller("/api/Theator")
export class TheatorController {
  constructor(@inject(TYPES.TheatorService) private TService: TheatorService) {}
  @httpPost("/createTheator", TYPES.VerifyDirectorToken)
  async createTheater(req: NewRequest, res: Response, next: NextFunction) {
    try {
      let theater: Itheator = req.body;
      theater.ownerId = req.userId;
      //   console.log(theater)
      const movieData = await this.TService.createTheator(theater);
      res.status(200).json(movieData);
    } catch (error: any) {
      next(error);
    }
  }
  @httpGet("/getTheator")
  async getTheater(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { userId, userRole } = req;
      //   console.log(Id, Role);
      if (userRole === "Theater-Admin") {
        const movieData = await this.TService.getTheator(userId, userRole);
        res.status(200).json(movieData);
      } else {
        const movieData = await this.TService.getTheator();
        res.status(200).json(movieData);
      }
    } catch (error: any) {
      next(error);
    }
  }
  @httpPut("/updateTheator/:TheaterId", TYPES.VerifyDirectorToken)
  async updateTheater(req: NewRequest, res: Response, next: NextFunction) {
    try {
      let Data: Itheator = req.body;
      Data.ownerId = req.userId;
      const { TheaterId } = req.params;
      const theaterData = await this.TService.updateTheator(Data, TheaterId);
      res.status(200).json(theaterData);
    } catch (error: any) {
      next(error);
    }
  }

  @httpDelete("/deleteTheator/:TheaterId", TYPES.VerifyDirectorToken)
  async deleteTheater(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const { TheaterId } = req.params;
      const theaterData = await this.TService.deleteTheator(TheaterId, userId);
      res.status(200).json(theaterData);
    } catch (error: any) {
      next(error);
    }
  }
}
