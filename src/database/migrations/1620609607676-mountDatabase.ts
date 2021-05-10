import {MigrationInterface, QueryRunner} from "typeorm";

export class mountDatabase1620609607676 implements MigrationInterface {
    name = 'mountDatabase1620609607676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "funcionario" ("id" BIGSERIAL NOT NULL, "cpf" bigint NOT NULL, "nome" character varying NOT NULL, "email" character varying, "endereco" character varying NOT NULL, CONSTRAINT "UQ_a84346b7f338dec9a7eeae49935" UNIQUE ("cpf"), CONSTRAINT "UQ_f868493b618f6780e84ea266e5e" UNIQUE ("email"), CONSTRAINT "PK_2c5d0c275b4f652fd5cb381655f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c5d0c275b4f652fd5cb381655" ON "funcionario" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a84346b7f338dec9a7eeae4993" ON "funcionario" ("cpf") `);
        await queryRunner.query(`CREATE TABLE "empresa" ("id" BIGSERIAL NOT NULL, "cnpj" bigint NOT NULL, "nome" character varying NOT NULL, "endereco" character varying NOT NULL, CONSTRAINT "UQ_d6abff4b490c37b2934a5fe40ff" UNIQUE ("cnpj"), CONSTRAINT "PK_bee78e8f1760ccf9cff402118a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bee78e8f1760ccf9cff402118a" ON "empresa" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d6abff4b490c37b2934a5fe40f" ON "empresa" ("cnpj") `);
        await queryRunner.query(`CREATE TABLE "empresa_funcionarios_vinculados_funcionario" ("empresaId" bigint NOT NULL, "funcionarioId" bigint NOT NULL, CONSTRAINT "PK_76b4d6307fb2500e5485c6af73c" PRIMARY KEY ("empresaId", "funcionarioId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_54f8ccd7d48029ccad880cad23" ON "empresa_funcionarios_vinculados_funcionario" ("empresaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e9280a013caa7bd9a5c477782" ON "empresa_funcionarios_vinculados_funcionario" ("funcionarioId") `);
        await queryRunner.query(`ALTER TABLE "empresa_funcionarios_vinculados_funcionario" ADD CONSTRAINT "FK_54f8ccd7d48029ccad880cad232" FOREIGN KEY ("empresaId") REFERENCES "empresa"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa_funcionarios_vinculados_funcionario" ADD CONSTRAINT "FK_2e9280a013caa7bd9a5c4777825" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresa_funcionarios_vinculados_funcionario" DROP CONSTRAINT "FK_2e9280a013caa7bd9a5c4777825"`);
        await queryRunner.query(`ALTER TABLE "empresa_funcionarios_vinculados_funcionario" DROP CONSTRAINT "FK_54f8ccd7d48029ccad880cad232"`);
        await queryRunner.query(`DROP INDEX "IDX_2e9280a013caa7bd9a5c477782"`);
        await queryRunner.query(`DROP INDEX "IDX_54f8ccd7d48029ccad880cad23"`);
        await queryRunner.query(`DROP TABLE "empresa_funcionarios_vinculados_funcionario"`);
        await queryRunner.query(`DROP INDEX "IDX_d6abff4b490c37b2934a5fe40f"`);
        await queryRunner.query(`DROP INDEX "IDX_bee78e8f1760ccf9cff402118a"`);
        await queryRunner.query(`DROP TABLE "empresa"`);
        await queryRunner.query(`DROP INDEX "IDX_a84346b7f338dec9a7eeae4993"`);
        await queryRunner.query(`DROP INDEX "IDX_2c5d0c275b4f652fd5cb381655"`);
        await queryRunner.query(`DROP TABLE "funcionario"`);
    }

}
