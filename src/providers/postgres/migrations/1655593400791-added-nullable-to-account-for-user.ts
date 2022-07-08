import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedNullableToAccountForUser1655593400791 implements MigrationInterface {
  name = 'addedNullableToAccountForUser1655593400791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_17a709b8b6146c491e6615c29d7"`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "account_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_17a709b8b6146c491e6615c29d7" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_17a709b8b6146c491e6615c29d7"`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "account_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_17a709b8b6146c491e6615c29d7" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
