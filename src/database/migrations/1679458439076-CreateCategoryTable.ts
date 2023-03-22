import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1679458439076 implements MigrationInterface {
    name = 'CreateCategoryTable1679458439076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679458439601', "updated_at" bigint NOT NULL DEFAULT '1679458439601', "name" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679458439601'`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679381732741'`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "categoryId" TO "category"`);
    }

}
