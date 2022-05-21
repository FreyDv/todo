import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1653116517454 implements MigrationInterface {
  name = 'init1653116517454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "privateField" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todo-list" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "is-done" boolean NOT NULL, "user-id" integer, CONSTRAINT "PK_45bb5da8cc53815d58f810dd2d4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo-list" ADD CONSTRAINT "FK_95af922cf971f3a88e076aad828" FOREIGN KEY ("user-id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo-list" DROP CONSTRAINT "FK_95af922cf971f3a88e076aad828"`,
    );
    await queryRunner.query(`DROP TABLE "todo-list"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
