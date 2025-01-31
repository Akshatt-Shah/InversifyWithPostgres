const Jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { json } from "sequelize";
import { NewRequest } from "../Interfaces";
import { BaseMiddleware } from "inversify-express-utils";

@injectable()

export class VerifyDirectorToken extends BaseMiddleware {
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
          // console.log(decoded)
          if (decoded.UserRole === "Director") {
            req.userId = decoded.UserId;
            req.userRole = decoded.Role;
            // console.log(req.userId);
            next();
          } else {
            res.status(200).json({ message: "unauthorized Director" });
          }
        } catch (err) {
          return res.status(401).send({
            message: "Invalid token",
          });
        }
      }
}

