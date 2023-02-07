import { MigrationInterface, QueryRunner } from "typeorm";

export class init1675783893659 implements MigrationInterface {
    name = 'init1675783893659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1675783894692', "updated_at" bigint NOT NULL DEFAULT '1675783894692', "phone" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dob" integer NOT NULL, "gender" integer NOT NULL, "address" character varying NOT NULL, "point" integer NOT NULL, "cashback" integer NOT NULL, "rate" integer NOT NULL, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rule" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1675783894692', "updated_at" bigint NOT NULL DEFAULT '1675783894692', "title" character varying NOT NULL, "start_time" character varying NOT NULL, "endTime" character varying NOT NULL, "store_image" character varying NOT NULL, "privacy_policy" character varying NOT NULL, "rule_rate" integer NOT NULL, "dob_rule_rate" integer NOT NULL, "storeId" integer, CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tier" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1675783894692', "updated_at" bigint NOT NULL DEFAULT '1675783894692', "name" character varying NOT NULL, "desc" character varying NOT NULL, "status" integer NOT NULL, "level" integer NOT NULL, "gap" integer NOT NULL, "tier_rate" character varying NOT NULL, "dob_tier_rate" integer NOT NULL, "storeId" integer, CONSTRAINT "PK_14d67ceef0dbea040e39e97e7f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1675783894692', "updated_at" bigint NOT NULL DEFAULT '1675783894692', "email" character varying NOT NULL, "phone" character varying NOT NULL, "business_type" character varying NOT NULL, "store_image" character varying NOT NULL, "privacy_policy" character varying NOT NULL, "branchId" integer, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1675783894692', "updated_at" bigint NOT NULL DEFAULT '1675783894692', "username" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "token" character varying, "branchId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "REL_8b17d5d91bf27d0a33fb80ade8" UNIQUE ("branchId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1675783894692', "updated_at" bigint NOT NULL DEFAULT '1675783894692', "name" character varying NOT NULL, "announcements" character varying NOT NULL, "member_url" character varying NOT NULL, "is_active_tiers" boolean NOT NULL, "userId" integer, CONSTRAINT "UQ_d6d14945d4352867ecc62bcf85c" UNIQUE ("name"), CONSTRAINT "REL_f969fd357b4491268a4520e8a0" UNIQUE ("userId"), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member_store" ("memberId" integer NOT NULL, "storeId" integer NOT NULL, CONSTRAINT "PK_53203ba2f7ce3f422b6956ed9b4" PRIMARY KEY ("memberId", "storeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0721eac581e4492fba010a80f" ON "member_store" ("memberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9f08132cc6a32da915a192921" ON "member_store" ("storeId") `);
        await queryRunner.query(`ALTER TABLE "rule" ADD CONSTRAINT "FK_d8b0bc34ef948c2eff2aeac8039" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tier" ADD CONSTRAINT "FK_90156e531252ae045c96204f511" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_6f202a405e2209d741f8ec7e554" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_f969fd357b4491268a4520e8a07" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_store" ADD CONSTRAINT "FK_a0721eac581e4492fba010a80f8" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "member_store" ADD CONSTRAINT "FK_b9f08132cc6a32da915a1929213" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_store" DROP CONSTRAINT "FK_b9f08132cc6a32da915a1929213"`);
        await queryRunner.query(`ALTER TABLE "member_store" DROP CONSTRAINT "FK_a0721eac581e4492fba010a80f8"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_f969fd357b4491268a4520e8a07"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_6f202a405e2209d741f8ec7e554"`);
        await queryRunner.query(`ALTER TABLE "tier" DROP CONSTRAINT "FK_90156e531252ae045c96204f511"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP CONSTRAINT "FK_d8b0bc34ef948c2eff2aeac8039"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9f08132cc6a32da915a192921"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0721eac581e4492fba010a80f"`);
        await queryRunner.query(`DROP TABLE "member_store"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "tier"`);
        await queryRunner.query(`DROP TABLE "rule"`);
        await queryRunner.query(`DROP TABLE "member"`);
    }

}
