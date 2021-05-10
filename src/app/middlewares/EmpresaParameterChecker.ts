
import { NextFunction, Request, Response } from 'express';
import ParameterChecker from './ParameterChecker'
import RSC from '../../ResponseStatus';

class EmpresaParameterChecker implements ParameterChecker {

    checkBodyParamTypes(
        req: Request, res: Response, next: NextFunction
    ) {
        if (req.body.hasOwnProperty('cnpj')) {
            if (!(/^\d{1,14}$/.test(req.body.cnpj))) {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({ "erro": 'O "cnpj" informado não é válido' })
            }
            req.body.cnpj = Number(req.body.cnpj);
        }
        for (const param of ['nome', 'endereco']) {
            if (req.body.hasOwnProperty(param) && typeof req.body[param] != 'string') {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({ "erro": `O "${param}" informado não é uma string` });
            }
        }
        next();
    }

    checkQueryStringParamTypes(
        req: Request, res: Response, next: NextFunction
    ) {
        req.where = {};
        if (req.query.hasOwnProperty('cnpj')) {
            if (typeof req.query.cnpj != 'string') {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({ "erro": `Query string tem de ser do tipo string` });
            }
            if (!(/^\d{1,14}$/.test(req.query.cnpj))) {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({
                        "erro": 'Query string "cnpj"'
                            + ' tem de ser uma sequência de até 14 digitos númericos'
                    })
            }
            req.where.cnpj = Number(req.query.cnpj);
        }
        for (const param of ['nome', 'endereco']) {
            if (req.query.hasOwnProperty(param)) {
                if (typeof req.query[param] != 'string') {
                    return res.status(RSC.ERRO_NOS_PARAMETROS)
                        .send({ "erro": `Query string tem de ser do tipo string` });
                }
                req.where[param] = req.query[param];
            }
        }
        next();
    }
}

export default new EmpresaParameterChecker();
