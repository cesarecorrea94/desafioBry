
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Empresa from '../models/Empresa';
import RSC from '../../ResponseStatus';



class EmpresaController {

	async get(req: Request, res: Response) {
		const repo = getRepository(Empresa);
		let empresas: Empresa[];
		if (req.hasOwnProperty('where')) {
			const where = req.where as {
				cnpj?: number,
				nome?: string,
				endereco?: string
			};
			empresas = await repo.find({ where, relations: ["funcionarios_vinculados"] });
		} else {
			empresas = await repo.find({ relations: ["funcionarios_vinculados"] });
		}
		return res.status(RSC.OK)
			.json(empresas);
	}

	async getId(req: Request, res: Response) {
		const id = Number(req.params.empresaId);

		const repo = getRepository(Empresa);
		const empresa = await repo.findOne({
			where: { id },
			relations: ["funcionarios_vinculados"]
		});
		if (!empresa) {
			return res.status(RSC.NAO_ENCONTREI_PARA_RETORNAR)
				.send({ "erro": 'Não foi encontrado uma empresa com o id informado' });
		}

		return res.status(RSC.OK).json(empresa);
	}

	async post(req: Request, res: Response) {
		const { cnpj, nome, endereco } = req.body;

		const repo = getRepository(Empresa);
		if (await repo.findOne({ where: { cnpj } })) {
			return res.status(RSC.JA_EXISTE)
				.send({ "erro": 'Já existe uma empresa com o CNPJ informado' });
		}
		const empresa = repo.create({ cnpj, nome, endereco });
		await repo.save(empresa);

		return res.set('Location', `/empresas/${empresa.id}`)
			.sendStatus(RSC.CRIADO);
	}

	async putId(req: Request, res: Response) {
		const id = Number(req.params.empresaId);
		const { cnpj, nome, endereco } = req.body;

		const repo = getRepository(Empresa);
		const empresa = await repo.findOne({ where: { id } });
		if (!empresa) {
			return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
				.send({ "erro": 'Não existe uma empresa com o "id" informado para atualização' });
		}
		if (cnpj !== undefined && empresa.cnpj != cnpj) {
			if (await repo.findOne({ where: { cnpj } })) {
				return res.status(RSC.JA_EXISTE)
					.send({ "erro": 'Já existe uma empresa com o CNPJ informado' });
			}
			empresa.cnpj = cnpj;
		}
		if (nome !== undefined) {
			empresa.nome = nome;
		}
		if (endereco !== undefined) {
			empresa.endereco = endereco;
		}

		await repo.save(empresa);

		return res.status(RSC.OK)
			.json(empresa);
	}

	async deleteId(req: Request, res: Response) {
		const id = Number(req.params.empresaId);

		const repo = getRepository(Empresa);
		const empresa = await repo.findOne({ where: { id } });
		if (!empresa) {
			return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
				.send({ "erro": 'Não existe uma empresa com o "id" informado para exclusão' });
		}

		await repo.delete({ id });

		return res.sendStatus(RSC.OK);
	}
}

export default new EmpresaController();
