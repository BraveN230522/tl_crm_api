import { MigrationInterface, QueryRunner } from "typeorm";

export class updateChance1684941860459 implements MigrationInterface {
    name = 'updateChance1684941860459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chance_product" DROP CONSTRAINT "FK_30ab77c73ad4dfa55c66330d244"`);
        await queryRunner.query(`ALTER TABLE "chance_product" RENAME COLUMN "orderId" TO "chanceId"`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "successNote" character varying`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "expect_end_date" bigint NOT NULL DEFAULT '1684941865289'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684941865286'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684941865286'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684941865288'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684941865288'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684941865291'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684941865291'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "created_at" SET DEFAULT '1684941865113'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "updated_at" SET DEFAULT '1684941865114'`);
        await queryRunner.query(`ALTER TABLE "chance_product" ADD CONSTRAINT "FK_c2eb735acdf1f3d742b060a3fdc" FOREIGN KEY ("chanceId") REFERENCES "chance"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chance_product" DROP CONSTRAINT "FK_c2eb735acdf1f3d742b060a3fdc"`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684941093515'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684941093515'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684941093503'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684941093503'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684941093498'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684941093498'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684941093349'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684941093348'`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "expect_end_date"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "successNote"`);
        await queryRunner.query(`ALTER TABLE "chance_product" RENAME COLUMN "chanceId" TO "orderId"`);
        await queryRunner.query(`ALTER TABLE "chance_product" ADD CONSTRAINT "FK_30ab77c73ad4dfa55c66330d244" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
