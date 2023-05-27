import { MigrationInterface, QueryRunner } from "typeorm";

export class init1685174685845 implements MigrationInterface {
    name = 'init1685174685845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT 1685174687352`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT 1685174687352`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT 1685174687355`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT 1685174687355`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT 1685174687355`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT 1685174687355`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "created_at" SET DEFAULT 1685174687356`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "updated_at" SET DEFAULT 1685174687356`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT 1685174687359`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT 1685174687359`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT 1685174687360`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT 1685174687360`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT 1685174687360`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT 1685174687360`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT 1685174687362`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT 1685174687362`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT 1685174687364`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT 1685174687364`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1685174687209'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1685174687209'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT 1685174687366`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT 1685174687366`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1685174687209'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1685174687209'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT 1685174687367`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT 1685174687367`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT 1685174687367`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT 1685174687367`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT 1685174687367`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT 1685174687368`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "expect_end_date" SET DEFAULT '1685174687211'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT 1685174687368`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT 1685174687368`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT 1685174687368`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT 1685174687368`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1685174687212'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1685174687212'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT 1685174687369`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT 1685174687369`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT 1685174687370`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT 1685174687370`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT 1685174687371`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT 1685174687371`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1685173778528'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1685173778528'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1685173778535'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1685173778535'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1685173778529'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1685173778529'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1685173778253'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1685173778253'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1685173778547'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1685173778547'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1685173778547'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1685173778547'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "expect_end_date" SET DEFAULT '1685173778253'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1685173778545'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1685173778545'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1685173778543'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1685173778543'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1685173778531'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1685173778530'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1685173778252'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1685173778252'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1685173778539'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1685173778539'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1685173778248'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1685173778248'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1685173778533'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1685173778533'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1685173778526'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1685173778526'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1685173778520'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1685173778520'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1685173778538'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1685173778538'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1685173778537'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1685173778537'`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "updated_at" SET DEFAULT '1685173778536'`);
        await queryRunner.query(`ALTER TABLE "chance_product" ALTER COLUMN "created_at" SET DEFAULT '1685173778536'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1685173778519'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1685173778519'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1685173778517'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1685173778517'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1685173778510'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1685173778510'`);
    }

}
