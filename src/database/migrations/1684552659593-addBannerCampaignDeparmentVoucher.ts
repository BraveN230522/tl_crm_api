import { MigrationInterface, QueryRunner } from "typeorm";

export class addBannerCampaignDeparmentVoucher1684552659593 implements MigrationInterface {
    name = 'addBannerCampaignDeparmentVoucher1684552659593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1684552660923', "updated_at" bigint NOT NULL DEFAULT '1684552660923', "name" character varying NOT NULL, "desc" character varying, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."voucher_status_enum" AS ENUM('BLOCK', 'ACTIVE')`);
        await queryRunner.query(`CREATE TYPE "public"."voucher_type_enum" AS ENUM('VOUCHER', 'CODE')`);
        await queryRunner.query(`CREATE TABLE "voucher" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1684552660923', "updated_at" bigint NOT NULL DEFAULT '1684552660923', "name" integer NOT NULL, "desc" character varying, "start_date" bigint NOT NULL DEFAULT '1684552660942', "end_date" bigint DEFAULT '1684552660942', "discount_percent" character varying NOT NULL, "max_num_of_use" character varying DEFAULT '0', "numOfUsed" character varying DEFAULT '0', "min_cost_to_apply" character varying DEFAULT '0', "status" "public"."voucher_status_enum" NOT NULL DEFAULT 'ACTIVE', "type" "public"."voucher_type_enum" NOT NULL DEFAULT 'VOUCHER', "campaignId" integer, "storeId" integer, CONSTRAINT "PK_677ae75f380e81c2f103a57ffaf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banner" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1684552660923', "updated_at" bigint NOT NULL DEFAULT '1684552660923', "name" integer NOT NULL, "desc" character varying, "image" character varying, "campaignId" integer, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "start_date" bigint NOT NULL DEFAULT '1684552660943'`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "end_date" bigint NOT NULL DEFAULT '1684552660943'`);
        await queryRunner.query(`CREATE TYPE "public"."campaign_status_enum" AS ENUM('DRAFT', 'NOT_ACTIVE', 'ACTIVE', 'END', 'CANCELED', 'OVERDUE')`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "status" "public"."campaign_status_enum" NOT NULL DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "importerId" integer`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD "exporterId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "departmentId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "voucherId" integer`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "campaignId" integer`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "desc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684552660947'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684552660947'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684552660923'`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_055eb6afebcb876790f392d5f66" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_225591a8f647c953baf6bf19a7c" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "banner" ADD CONSTRAINT "FK_905e4c230f2a0d4918e742230ba" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_a886abcbe460a08f636f0b772ce" FOREIGN KEY ("importerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaign" ADD CONSTRAINT "FK_814c4f25ead2a1068f2414a83c3" FOREIGN KEY ("exporterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_3d6915a33798152a079997cad28" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cff8eff4c72e7c4cb5bf045447c" FOREIGN KEY ("voucherId") REFERENCES "voucher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chance" ADD CONSTRAINT "FK_398879ba02ce662372a9f37d40c" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chance" DROP CONSTRAINT "FK_398879ba02ce662372a9f37d40c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cff8eff4c72e7c4cb5bf045447c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_3d6915a33798152a079997cad28"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_814c4f25ead2a1068f2414a83c3"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP CONSTRAINT "FK_a886abcbe460a08f636f0b772ce"`);
        await queryRunner.query(`ALTER TABLE "banner" DROP CONSTRAINT "FK_905e4c230f2a0d4918e742230ba"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_225591a8f647c953baf6bf19a7c"`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_055eb6afebcb876790f392d5f66"`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684491419018'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684491419018'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "desc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684491418960'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684491418959'`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "campaignId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "voucherId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "departmentId"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "exporterId"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "importerId"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."campaign_status_enum"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "start_date"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`DROP TABLE "voucher"`);
        await queryRunner.query(`DROP TYPE "public"."voucher_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."voucher_status_enum"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
