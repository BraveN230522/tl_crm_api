import { MigrationInterface, QueryRunner } from "typeorm";

export class updateChanceStatus1684947023012 implements MigrationInterface {
    name = 'updateChanceStatus1684947023012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chance" ADD "total" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."chance_status_enum" AS ENUM('IN_PROCESS', 'FAILED_END', 'SUCCESS_END')`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "status" "public"."chance_status_enum" NOT NULL DEFAULT 'IN_PROCESS'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684947026773'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684947026773'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684947026775'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684947026775'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "expect_end_date" SET DEFAULT '1684947026776'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684947026776'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684947026776'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "end_date" SET DEFAULT '1684941865291'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "start_date" SET DEFAULT '1684941865291'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "expect_end_date" SET DEFAULT '1684941865289'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "delivery_date" SET DEFAULT '1684941865288'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_date" SET DEFAULT '1684941865288'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "end_date" SET DEFAULT '1684941865286'`);
        await queryRunner.query(`ALTER TABLE "voucher" ALTER COLUMN "start_date" SET DEFAULT '1684941865286'`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."chance_status_enum"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "total"`);
    }

}
