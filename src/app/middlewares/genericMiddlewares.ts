import { NextFunction, Request, Response } from 'express';
import RSC from '../../ResponseStatus';


export function checkParamIdName(idName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!(/^\d+$/.test(req.params[idName]))) {
            return res.status(RSC.ERRO_NOS_PARAMETROS)
                .send({ "erro": `O "${idName}" informado não é válido` })
        }
        next();
    }
}


export function checkBodyRequiredParameters(params: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const p of params) {
            if (!req.body.hasOwnProperty(p)) {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({ "erro": `O "${p}" não foi informado` });
            }
        }
        next();
    }
}
