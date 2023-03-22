import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1679457377181 implements MigrationInterface {
    name = 'CreateCategoryTable1679457377181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_912c275c5d9191470f3334cea46"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679457378710', "updated_at" bigint NOT NULL DEFAULT '1679457378711', "name" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "campaignId" integer`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679457378710'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679457378711'`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_54be9244b4c81aa675fc9334699" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_54be9244b4c81aa675fc9334699"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679323819262'`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "campaignId"`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "storeId" integer`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "categoryId" TO "category"`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_912c275c5d9191470f3334cea46" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
