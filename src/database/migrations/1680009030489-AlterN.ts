import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterN1680009030489 implements MigrationInterface {
    name = 'AlterN1680009030489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "desc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1680009030844'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1680009030844'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "desc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679931653187'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679931653187'`);
    }

}
