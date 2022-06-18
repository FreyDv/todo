import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedUserIdToAuth1655415372027 implements MigrationInterface {
  name = 'addedUserIdToAuth1655415372027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auth" ADD "user_id" integer`);
    await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_9922406dc7d70e20423aeffadf3" UNIQUE ("user_id")`);
    await queryRunner.query(`ALTER TABLE "todo-list" DROP CONSTRAINT "FK_95af922cf971f3a88e076aad828"`);
    await queryRunner.query(`ALTER TABLE "todo-list" ALTER COLUMN "user-id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "todo-list" ADD CONSTRAINT "FK_95af922cf971f3a88e076aad828" FOREIGN KEY ("user-id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`);
    await queryRunner.query(`ALTER TABLE "todo-list" DROP CONSTRAINT "FK_95af922cf971f3a88e076aad828"`);
    await queryRunner.query(`ALTER TABLE "todo-list" ALTER COLUMN "user-id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "todo-list" ADD CONSTRAINT "FK_95af922cf971f3a88e076aad828" FOREIGN KEY ("user-id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_9922406dc7d70e20423aeffadf3"`);
    await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "user_id"`);
  }
}
