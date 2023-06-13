import { NextFunction, Request, Response } from 'express'
import fakeData from '../db/index'

export default class VerifyUser {
  public static check(req: Request, res: Response, next: NextFunction): Response | void {
    const { headers: { token } } = req
  
    const authorizedUSer = fakeData.find((user) => user.token === token)

    return !authorizedUSer ? res.status(401).json({ message: 'Não autorizado' }) : next() 
  }
}