import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1610000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "block" (
        "height" integer PRIMARY KEY,
        "hash" varchar NOT NULL,
        "timestamp" timestamp NOT NULL
      );
      CREATE TABLE "transaction" (
        "hash" varchar PRIMARY KEY,
        "height" integer NOT NULL,
        "body" jsonb NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "transaction";
      DROP TABLE "block";
    `);
  }
}
