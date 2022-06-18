import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1655587380600 implements MigrationInterface {
  name = 'init1655587380600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo-list" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "is-done" boolean NOT NULL,
        "user-id" integer,
        CONSTRAINT "PK_45bb5da8cc53815d58f810dd2d4" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "privateField" character varying NOT NULL,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "REL_efef1e5fdbe318a379c06678c5" UNIQUE ("user_id"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `
       ALTER TABLE "todo-list" ADD CONSTRAINT "FK_95af922cf971f3a88e076aad828" 
       FOREIGN KEY ("user-id") 
       REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      `,
    );
    await queryRunner.query(
      `
        ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" 
        FOREIGN KEY ("user_id") 
        REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
    await queryRunner.query(`ALTER TABLE "todo-list" DROP CONSTRAINT "FK_95af922cf971f3a88e076aad828"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "todo-list"`);
  }
}
