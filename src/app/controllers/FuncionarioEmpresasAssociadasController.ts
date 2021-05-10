
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Funcionario from '../models/Funcionario';
import Empresa from '../models/Empresa';
import RSC from '../../ResponseStatus'


class FuncionarioEmpresasAssociadasController {

    async post(req: Request, res: Response) {
        const funcionarioId = Number(req.params.funcionarioId);
        const cnpj = Number(req.body.cnpj);

        const repo = getRepository(Funcionario);
        const funcionario = await repo.findOne({
            where: { id: funcionarioId },
            relations: ["empresas_associadas"]
        });
        if (!funcionario) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
                .send({ "erro": 'O funcionário correspondente ao id deste endpoint não existe' });
        }
        if (funcionario.empresas_associadas.find((e) => e.cnpj == cnpj)) {
            return res.status(RSC.JA_EXISTE)
                .send({ "erro": 'A empresa já estava associada ao funcionário' });
        }
        const empresa = await getRepository(Empresa).findOne({ where: { cnpj } });
        if (!empresa) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
                .send({
                    "erro": 'A empresa a qual desejas associar ao funcionário não existe.'
                        + ' Cadastre-a em /empresas antes.'
                });
        }

        funcionario.empresas_associadas.push(empresa);
        await repo.save(funcionario);

        return res.set('Location', `/funcionarios/${funcionario.id}/empresas/${empresa.id}`)
            .sendStatus(RSC.CRIADO);
    }

    async get(req: Request, res: Response) {
        const funcionarioId = Number(req.params.funcionarioId);

        const repo = getRepository(Funcionario);
        const funcionario = await repo.findOne({
            where: { id: funcionarioId },
            relations: ["empresas_associadas"]
        });
        if (!funcionario) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
                .send({ "erro": 'O funcionário correspondente ao id deste endpoint não existe' });
        }

        return res.status(RSC.OK).json(funcionario.empresas_associadas);
    }

    async getId(req: Request, res: Response) {
        const funcionarioId = Number(req.params.funcionarioId);
        const empresaId = Number(req.params.empresaId);

        const repo = getRepository(Funcionario);
        const funcionario = await repo.findOne({
            where: { id: funcionarioId },
            relations: ["empresas_associadas"]
        });
        if (!funcionario) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
                .send({ "erro": 'O funcionário correspondente ao id deste endpoint não existe' });
        }

        const empresa = funcionario.empresas_associadas.filter((e) => e.id == empresaId);
        if (!empresa) {
            return res.status(RSC.NAO_ENCONTREI_PARA_RETORNAR)
                .send({ "erro": 'A empresa não está associada ao funcionário' });
        }

        return res.status(RSC.OK).json(empresa);
    }

    async deleteId(req: Request, res: Response) {
        const funcionarioId = Number(req.params.funcionarioId);
        const empresaId = Number(req.params.empresaId);

        const repo = getRepository(Funcionario);
        const funcionario = await repo.findOne({
            where: { id: funcionarioId },
            relations: ["empresas_associadas"]
        });
        if (!funcionario) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
            .send({ "erro": 'O funcionário correspondente ao id deste endpoint não existe' });
        }
        const empresa = funcionario.empresas_associadas.find((e) => e.id == empresaId);
        if (!empresa) {
            return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
                .send({ "erro": 'A empresa não estava associada ao funcionário' });
        }

        funcionario.empresas_associadas.splice(
            funcionario.empresas_associadas.indexOf(empresa), 1);
        await repo.save(funcionario);

        return res.sendStatus(RSC.OK);
    }
}

export default new FuncionarioEmpresasAssociadasController();
