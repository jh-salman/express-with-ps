import { NextFunction, Request, Response } from "express";


export const logger = (req: Request, res: Response, next: NextFunction)=>{
    req.body
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}'\n `)

    next()
    

}
