import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Index } from 'typeorm';
import Empresa from './Empresa';

@Entity('funcionario')
class Funcionario {
	static readonly requiredProps = ['cpf', 'nome', 'endereco'];

	@Index()
	@PrimaryGeneratedColumn('increment', { type: 'bigint' })
	id: number;

	@Index()
	@Column({
		type: 'bigint',
		unique: true
	})
	cpf: number;

	@Column('varchar')
	nome: string;

	@Column({
		type: 'varchar',
		unique: true,
		nullable: true
	})
	email: string;

	@Column('varchar')
	endereco: string;

	@ManyToMany(type => Empresa, empresa => empresa.funcionarios_vinculados)
	empresas_associadas: Empresa[];
}

export default Funcionario;
