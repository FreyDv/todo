import { MigrationInterface, QueryRunner } from 'typeorm';

export class accountAdedColumTypeAndRefactoredRelationToUserMenyToOne1656231620084 implements MigrationInterface {
  name = 'accountAdedColumTypeAndRefactoredRelationToUserMenyToOne1656231620084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_17a709b8b6146c491e6615c29d7"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_17a709b8b6146c491e6615c29d7"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account_id"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "type" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
    await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c"`);
    await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "REL_efef1e5fdbe318a379c06678c5"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
    await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "REL_efef1e5fdbe318a379c06678c5" UNIQUE ("user_id")`);
    await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email")`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "account_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_17a709b8b6146c491e6615c29d7" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_17a709b8b6146c491e6615c29d7" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
