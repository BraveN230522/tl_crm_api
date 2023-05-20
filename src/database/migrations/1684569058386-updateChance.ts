import { MigrationInterface, QueryRunner } from "typeorm";

export class updateChance1684569058386 implements MigrationInterface {
    name = 'updateChance1684569058386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chance" ADD "desc" character varying`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "note" character varying`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "failedNote" character varying`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "success_rate" character varying`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684569059938'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684569059938'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684569059939'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684569059939'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684569059940'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684569059940'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "created_at" SET DEFAULT '1684569059914'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "updated_at" SET DEFAULT '1684569059914'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "deparment" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684565677148'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684565677148'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684565677147'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684565677147'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684565677146'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684565677146'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "success_rate"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "failedNote"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "desc"`);
    }

}
