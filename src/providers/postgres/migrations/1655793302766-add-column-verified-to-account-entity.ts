import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnVerifiedToAccountEntity1655793302766 implements MigrationInterface {
  name = 'addColumnVerifiedToAccountEntity1655793302766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" ADD "verified" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "verified"`);
  }
}
