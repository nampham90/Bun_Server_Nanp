import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { authConfig } from "@config/auth.config";
import { Result } from "@common/result/Result";
import { ErrorEnum } from "@common/enums/ErrorCodeEnum";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.headers["authorization"]?.substring(7);
    let lang = <string>req.headers['accept-language'];
    let jwtPayload;
    //Try to validate the token and get data
    try {
      jwtPayload = <any>jwt.verify(token, authConfig.jwtSecret!);
      res.locals.jwtPayload = jwtPayload;
      res.locals.jwtPayload.lang = lang;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_TOKEN));
      return;
    }
    // check req
    const { condition } = req.body
    if (!condition ) {
      return res.status(200).send(Result.failureCode(ErrorEnum.SYS_ERR_FIELD_REQUEST));
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, authConfig.jwtSecret!, {
      expiresIn: "1h"
    });
    res.setHeader("Authorization", newToken);
  
    //Call the next middleware or controller
    next();
  };


