
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Funcionario from '../models/Funcionario';
import RSC from '../../ResponseStatus';



class FuncionarioController {

	async get(req: Request, res: Response) {
		const repo = getRepository(Funcionario);
		let funcionarios: Funcionario[];
		if (req.hasOwnProperty('where')) {
			const where = req.where as {
				cpf?: number,
				nome?: string,
				email?: string,
				endereco?: string
			};
			funcionarios = await repo.find({ where, relations: ["empresas_associadas"] });
		} else {
			funcionarios = await repo.find({ relations: ["empresas_associadas"] });
		}
		return res.status(RSC.OK)
			.json(funcionarios);
	}

	async getId(req: Request, res: Response) {
		const id = Number(req.params.funcionarioId);

		const repo = getRepository(Funcionario);
		const funcionario = await repo.findOne({
			where: { id },
			relations: ["empresas_associadas"]
		});
		if (!funcionario) {
			return res.status(RSC.NAO_ENCONTREI_PARA_RETORNAR)
				.send({ "erro": 'Não foi encontrado um funcionário com o id informado' });
		}

		return res.status(RSC.OK).json(funcionario);
	}

	async post(req: Request, res: Response) {
		const { cpf, nome, email, endereco } = req.body;

		const repo = getRepository(Funcionario);
		if (await repo.findOne({ where: { cpf } })) {
			return res.status(RSC.JA_EXISTE)
				.send({ "erro": 'Já existe um funcionário com o CPF informado' });
		}
		if (await repo.findOne({ where: { email } })) {
			return res.status(RSC.JA_EXISTE)
				.send({ "erro": 'Já existe um funcionário com o email informado' });
		}
		const funcionario = repo.create({ cpf, nome, email, endereco });
		await repo.save(funcionario);

		return res.set('Location', `/funcionarios/${funcionario.id}`)
			.sendStatus(RSC.CRIADO);
	}

	async putId(req: Request, res: Response) {
		const id = Number(req.params.funcionarioId);
		const { cpf, nome, email, endereco } = req.body;

		const repo = getRepository(Funcionario);
		const funcionario = await repo.findOne({ where: { id } });
		if (!funcionario) {
			return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
				.send({ "erro": 'Não existe um funcionário com o "id" informado para atualização' });
		}
		if (cpf !== undefined && funcionario.cpf != cpf) {
			if (await repo.findOne({ where: { cpf } })) {
				return res.status(RSC.JA_EXISTE)
					.send({ "erro": 'Já existe um funcionário com o CPF informado' });
			}
			funcionario.cpf = cpf;
		}
		if (email !== undefined && funcionario.email != email) {
			if (await repo.findOne({ where: { email } })) {
				return res.status(RSC.JA_EXISTE)
					.send({ "erro": 'Já existe um funcionário com o email informado' });
			}
			funcionario.email = email;
		}
		if (nome !== undefined) {
			funcionario.nome = nome;
		}
		if (endereco !== undefined) {
			funcionario.endereco = endereco;
		}

		await repo.save(funcionario);

		return res.sendStatus(RSC.OK);
	}

	async deleteId(req: Request, res: Response) {
		const id = Number(req.params.funcionarioId);

		const repo = getRepository(Funcionario);
		const funcionario = await repo.findOne({ where: { id } });
		if (!funcionario) {
			return res.status(RSC.NAO_EXISTE_PARA_OPERAR)
				.send({ "erro": 'Não existe um funcionário com o "id" informado para exclusão' });
		}

		await repo.delete({ id });

		return res.sendStatus(RSC.OK);
	}
}

export default new FuncionarioController();
