const Jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { json } from "sequelize";
export interface NewRequest extends Request {
  userId?: string;
  userRole?: string;
}
@injectable()
export class VerifyToken extends BaseMiddleware {

  async handler(req: NewRequest, res: Response, next: NextFunction) {
    const token = req.cookies.UserToken;
    // console.log(req.cookies)
    if (!token) {
      return res.status(403).send({
        message: "No token provided",
      });
    }
    try {
      const decoded = Jwt.verify(token, "Akshat");

      req.userId = decoded.UserId;
      req.userRole = decoded.Role;
    //   console.log(req.userId);
      next();
    } catch (err) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }
  }
}
