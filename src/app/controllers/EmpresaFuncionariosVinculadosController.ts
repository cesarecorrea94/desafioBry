
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Empresa from '../models/Empresa';
import Funcionario from '../models/Funcionario';
import RSC from '../../ResponseStatus'


class EmpresaFuncionariosVinculadosController {

    async post(req: Request, res: Response) {
        const empresaId = Number(req.params.empresaId);
        const cpf = Number(req.body.cpf);

        const repo = getRepository(Empresa);
        const empresa = await repo.findOne({
            where: { id: empresaId },
            relations: ["funcionarios_vinculados"]
        });
        if (!empresa) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
                .send({ "erro": 'A empresa correspondente ao id deste endpoint não existe' });
        }
        if (empresa.funcionarios_vinculados.find((f) => f.cpf == cpf)) {
            return res.status(RSC.JA_EXISTE)
                .send({ "erro": 'O funcionário já estava vinculado à empresa' });
        }
        const funcionario = await getRepository(Funcionario).findOne({ where: { cpf } });
        if (!funcionario) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
                .send({
                    "erro": 'O funcionário o qual desejas vincular à empresa não existe.'
                        + ' Cadastre-o em /funcionários antes.'
                });
        }

        empresa.funcionarios_vinculados.push(funcionario);
        await repo.save(empresa);

        return res.set('Location', `/empresas/${empresa.id}/funcionarios/${funcionario.id}`)
            .sendStatus(RSC.CRIADO);
    }

    async get(req: Request, res: Response) {
        const empresaId = Number(req.params.empresaId);

        const repo = getRepository(Empresa);
        const empresa = await repo.findOne({
            where: { id: empresaId },
            relations: ["funcionarios_vinculados"]
        });
        if (!empresa) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
            .send({ "erro": 'A empresa correspondente ao id deste endpoint não existe' });
        }

        return res.status(RSC.OK).json(empresa.funcionarios_vinculados);
    }

    async getId(req: Request, res: Response) {
        const empresaId = Number(req.params.empresaId);
        const funcionarioId = Number(req.params.funcionarioId);

        const repo = getRepository(Empresa);
        const empresa = await repo.findOne({
            where: { id: empresaId },
            relations: ["funcionarios_vinculados"]
        });
        if (!empresa) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
            .send({ "erro": 'O funcionário correspondente ao id deste endpoint não existe' });
        }

        const funcionario = empresa.funcionarios_vinculados.filter((f) => f.id == funcionarioId);
        if (!funcionario) {
            return res.status(RSC.NAO_ENCONTREI_PARA_RETORNAR)
                .send({ "erro": 'O funcionário não está vinculádo à empresa' });
        }

        return res.status(RSC.OK).json(funcionario);
    }

    async deleteId(req: Request, res: Response) {
        const empresaId = Number(req.params.empresaId);
        const funcionarioId = Number(req.params.funcionarioId);

        const repo = getRepository(Empresa);
        const empresa = await repo.findOne({
            where: { id: empresaId },
            relations: ["funcionarios_vinculados"]
        });
        if (!empresa) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
            .send({ "erro": 'A empresa correspondente ao id deste endpoint não existe' });
        }
        const funcionario = empresa.funcionarios_vinculados.find((f) => f.id == funcionarioId);
        if (!funcionario) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
            .send({ "erro": 'O funcionário não estava vinculado à empresa' });
        }

        empresa.funcionarios_vinculados.splice(
            empresa.funcionarios_vinculados.indexOf(funcionario), 1);
        await repo.save(empresa);

        return res.sendStatus(RSC.OK);
    }
}

export default new EmpresaFuncionariosVinculadosController();
