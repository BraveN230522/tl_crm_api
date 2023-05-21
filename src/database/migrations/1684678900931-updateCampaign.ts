import { MigrationInterface, QueryRunner } from "typeorm";

export class updateCampaign1684678900931 implements MigrationInterface {
    name = 'updateCampaign1684678900931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign" ADD "note" character varying`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684678904177'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684678904177'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684678904178'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684678904178'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684678904179'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684678904179'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "created_at" SET DEFAULT '1684678904079'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "updated_at" SET DEFAULT '1684678904079'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684574905412'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684574905412'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684574905411'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684574905411'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684574905410'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684574905410'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684574905381'`);
        await queryRunner.query(`ALTER TABLE "campaign" DROP COLUMN "note"`);
    }

}
