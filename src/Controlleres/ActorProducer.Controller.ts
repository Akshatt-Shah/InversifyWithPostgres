import { NextFunction, Request, Response } from "express";
import { IActorProducer } from "../Interfaces";
import { ActorProducerServices } from "../Services";
import { inject } from "inversify";
import { TYPES } from "../Types/types";
import {
  controller,
  httpPost,
  httpDelete,
  httpGet,
  httpPut,
} from "inversify-express-utils";

@controller("/api/ActorProducer")
export class ActorProducerController {
  constructor(
    @inject(TYPES.ActorProducerServices) private service: ActorProducerServices
  ) {}
  @httpPost("/createActorProducer", TYPES.VerifyDirectorToken)
  async createActorProducer(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IActorProducer = req.body;
      const dataValue = await this.service.createActorProducer(data);
      res.status(200).json(dataValue);
    } catch (error: any) {
      next(error);
    }
  }
  @httpGet("/getActorProducer")
  async getActorProducer(req: Request, res: Response, next: NextFunction) {
    try {
      const Data: IActorProducer = req.body;
      const actorProducerData = await this.service.getActorProducer();
      res.status(200).json(actorProducerData);
    } catch (error: any) {
      next(error);
    }
  }
  @httpPut("/updateActorProducer/:id", TYPES.VerifyDirectorToken)
  async updateActorProducer(req: Request, res: Response, next: NextFunction) {
    try {
      const Data: IActorProducer = req.body;
      const { id } = req.params;
      const actorProducerData = await this.service.updateActorProducer(
        id,
        Data
      );
      res.status(200).json(actorProducerData);
    } catch (error: any) {
      next(error);
    }
  }
  @httpDelete("/deleteActorProducer/:id", TYPES.VerifyDirectorToken)
  async deleteActorProducer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const actorProducerData = await this.service.deleteActorProducer(id);
      res.status(200).json(actorProducerData);
    } catch (error: any) {
      next(error);
    }
  }
}
