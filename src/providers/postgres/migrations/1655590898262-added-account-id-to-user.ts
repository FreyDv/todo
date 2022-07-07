import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedAccountIdToUser1655590898262 implements MigrationInterface {
  name = 'addedAccountIdToUser1655590898262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "account_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_17a709b8b6146c491e6615c29d7" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_17a709b8b6146c491e6615c29d7" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_17a709b8b6146c491e6615c29d7"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_17a709b8b6146c491e6615c29d7"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account_id"`);
  }
}
