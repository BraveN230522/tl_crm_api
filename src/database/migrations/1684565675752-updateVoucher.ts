import { MigrationInterface, QueryRunner } from "typeorm";

export class updateVoucher1684565675752 implements MigrationInterface {
    name = 'updateVoucher1684565675752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deparment" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1684565677122', "updated_at" bigint NOT NULL DEFAULT '1684565677122', "name" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "PK_15527eaa817c6d6e4544ada349e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD "discount_amount" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684565677146'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684565677146'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684565677147'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684565677147'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684565677148'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684565677148'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684565677122'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684565677122'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "banner" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684557411052'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684557411052'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684557411051'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684557411051'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "order_product" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684557411050'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684557411050'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "department" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1684557411019'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1684557411018'`);
        await queryRunner.query(`ALTER TABLE "voucher" DROP COLUMN "discount_amount"`);
        await queryRunner.query(`DROP TABLE "deparment"`);
    }

}
