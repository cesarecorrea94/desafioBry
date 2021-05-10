
import { NextFunction, Request, Response } from 'express';
import ParameterChecker from './ParameterChecker'
import RSC from '../../ResponseStatus';

class FuncionarioParameterChecker implements ParameterChecker {

    checkBodyParamTypes(
        req: Request, res: Response, next: NextFunction
    ) {
        if (req.body.hasOwnProperty('cpf')) {
            if (!(/^\d{1,11}$/.test(req.body.cpf))) {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({ "erro": 'O "cpf" informado não é válido' })
            }
            req.body.cpf = Number(req.body.cpf);
        }
        for (const param of ['nome', 'email', 'endereco']) {
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
        if (req.query.hasOwnProperty('cpf')) {
            if (typeof req.query.cpf != 'string') {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({ "erro": `Query string tem de ser do tipo string` });
            }
            if (!(/^\d{1,11}$/.test(req.query.cpf))) {
                return res.status(RSC.ERRO_NOS_PARAMETROS)
                    .send({
                        "erro": 'Query string "cpf"'
                            + ' tem de ser uma sequência de até 11 digitos númericos'
                    })
            }
            req.where.cpf = Number(req.query.cpf);
        }
        for (const param of ['nome', 'email', 'endereco']) {
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

export default new FuncionarioParameterChecker();
