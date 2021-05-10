import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index } from 'typeorm';
import Funcionario from './Funcionario';

@Entity('empresa')
class Empresa {
	static readonly requiredProps = ['cnpj', 'nome', 'endereco'];
	
	@Index()
	@PrimaryGeneratedColumn('increment', { type: 'bigint' })
	id: number;

	@Index()
	@Column({
		type: 'bigint',
		unique: true
	})
	cnpj: number;

	@Column('varchar')
	nome: string;

	@Column('varchar')
	endereco: string;

	@ManyToMany(type => Funcionario, funcionario => funcionario.empresas_associadas)
	@JoinTable()
	funcionarios_vinculados: Funcionario[];
}

export default Empresa;
