import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(err)
  if (err.name == "SequelizeUniqueConstraintError") {
    return res
      .status(400)
      .json({ status: false, message: err.errors[0].message });
  } 
  else if (err.name == "SequelizeValidationError") {
    let errorvalue: any =[]
    for(err of err.errors){
      // console.log(err.message)
      errorvalue.push(err.message)
    }
    return res
      .status(400)
      .json({ status: false, message: errorvalue });
  } 
  else {
    // console.log(err);
    
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
}
