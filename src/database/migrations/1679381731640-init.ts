import { MigrationInterface, QueryRunner } from "typeorm";

export class init1679381731640 implements MigrationInterface {
    name = 'init1679381731640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "campaign" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "name" integer NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tier" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "name" character varying NOT NULL, "desc" character varying NOT NULL, "status" integer NOT NULL, "level" integer NOT NULL, "gap" integer NOT NULL, "tier_rate" character varying NOT NULL, "dob_tier_rate" integer NOT NULL, "storeId" integer, CONSTRAINT "PK_14d67ceef0dbea040e39e97e7f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."customer_gender_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "phone" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dob" integer NOT NULL, "gender" "public"."customer_gender_enum" NOT NULL DEFAULT '2', "address" character varying NOT NULL, "point" integer NOT NULL, "cashback" integer NOT NULL, "rate" integer NOT NULL, "tierId" integer, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "name" character varying NOT NULL, "desc" character varying NOT NULL, "category" character varying NOT NULL, "cost" integer NOT NULL, "quantity" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rule" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "title" character varying NOT NULL, "start_time" character varying NOT NULL, "endTime" character varying NOT NULL, "store_image" character varying NOT NULL, "privacy_policy" character varying NOT NULL, "rule_rate" integer NOT NULL, "dob_rule_rate" integer NOT NULL, "storeId" integer, CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "email" character varying NOT NULL, "phone" character varying NOT NULL, "business_type" character varying NOT NULL, "store_image" character varying NOT NULL, "privacy_policy" character varying NOT NULL, "branchId" integer, "campaignId" integer, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chance_process" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "step" integer NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "chanceId" integer, CONSTRAINT "PK_9eaf257a209b096117a6a08e37b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chance" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "name" character varying NOT NULL, "current_process" integer, "userId" integer, CONSTRAINT "PK_0cfd3306686e2ab26f3fc6970de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "username" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying, "forgot_password_otp" character varying, "is_forgot_password" boolean DEFAULT false, "role" character varying NOT NULL, "token" character varying, "branchId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "name" character varying NOT NULL, "announcements" character varying NOT NULL, "customer_url" character varying NOT NULL, "is_active_tiers" boolean NOT NULL, CONSTRAINT "UQ_d6d14945d4352867ecc62bcf85c" UNIQUE ("name"), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "created_at" bigint NOT NULL DEFAULT '1679381732741', "updated_at" bigint NOT NULL DEFAULT '1679381732741', "name" character varying NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT '0', "total" character varying NOT NULL, "importerId" integer, "exporterId" integer, CONSTRAINT "REL_49938df2803ef1bb934d82c455" UNIQUE ("importerId"), CONSTRAINT "REL_516877a49093a6d9a21c4c1a25" UNIQUE ("exporterId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_store" ("customerId" integer NOT NULL, "storeId" integer NOT NULL, CONSTRAINT "PK_974fa88511e7a051be187918089" PRIMARY KEY ("customerId", "storeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b4e1dd5c442deccc1ab286d6d" ON "customer_store" ("customerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_72222766636d2deaba06672045" ON "customer_store" ("storeId") `);
        await queryRunner.query(`CREATE TABLE "product_store" ("productId" integer NOT NULL, "storeId" integer NOT NULL, CONSTRAINT "PK_34afe0f6c7f6e87382d4228a177" PRIMARY KEY ("productId", "storeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_603ff90c2d8efe13e2335b6b2b" ON "product_store" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9ec587a29f4228b21394c54fb" ON "product_store" ("storeId") `);
        await queryRunner.query(`CREATE TABLE "product_order" ("orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_33ff72639f1826668f8294a3e7d" PRIMARY KEY ("orderId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42291ebe165058deecb017e652" ON "product_order" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_717057f3f11a00703018142215" ON "product_order" ("productId") `);
        await queryRunner.query(`ALTER TABLE "tier" ADD CONSTRAINT "FK_90156e531252ae045c96204f511" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_ec69d5892708429ac0b50af5ee3" FOREIGN KEY ("tierId") REFERENCES "tier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rule" ADD CONSTRAINT "FK_d8b0bc34ef948c2eff2aeac8039" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_6f202a405e2209d741f8ec7e554" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_54be9244b4c81aa675fc9334699" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chance_process" ADD CONSTRAINT "FK_62942e3a2c61cefda8b5284d921" FOREIGN KEY ("chanceId") REFERENCES "chance"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chance" ADD CONSTRAINT "FK_6ee19b1bbeaad23707a42f9fa7c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_49938df2803ef1bb934d82c4554" FOREIGN KEY ("importerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_516877a49093a6d9a21c4c1a251" FOREIGN KEY ("exporterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_store" ADD CONSTRAINT "FK_7b4e1dd5c442deccc1ab286d6d0" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "customer_store" ADD CONSTRAINT "FK_72222766636d2deaba06672045a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_store" ADD CONSTRAINT "FK_603ff90c2d8efe13e2335b6b2b9" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_store" ADD CONSTRAINT "FK_b9ec587a29f4228b21394c54fb7" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_42291ebe165058deecb017e652b" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_717057f3f11a007030181422152" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_717057f3f11a007030181422152"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_42291ebe165058deecb017e652b"`);
        await queryRunner.query(`ALTER TABLE "product_store" DROP CONSTRAINT "FK_b9ec587a29f4228b21394c54fb7"`);
        await queryRunner.query(`ALTER TABLE "product_store" DROP CONSTRAINT "FK_603ff90c2d8efe13e2335b6b2b9"`);
        await queryRunner.query(`ALTER TABLE "customer_store" DROP CONSTRAINT "FK_72222766636d2deaba06672045a"`);
        await queryRunner.query(`ALTER TABLE "customer_store" DROP CONSTRAINT "FK_7b4e1dd5c442deccc1ab286d6d0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_516877a49093a6d9a21c4c1a251"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_49938df2803ef1bb934d82c4554"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8b17d5d91bf27d0a33fb80ade8f"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP CONSTRAINT "FK_6ee19b1bbeaad23707a42f9fa7c"`);
        await queryRunner.query(`ALTER TABLE "chance_process" DROP CONSTRAINT "FK_62942e3a2c61cefda8b5284d921"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_54be9244b4c81aa675fc9334699"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_6f202a405e2209d741f8ec7e554"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP CONSTRAINT "FK_d8b0bc34ef948c2eff2aeac8039"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_ec69d5892708429ac0b50af5ee3"`);
        await queryRunner.query(`ALTER TABLE "tier" DROP CONSTRAINT "FK_90156e531252ae045c96204f511"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_717057f3f11a00703018142215"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42291ebe165058deecb017e652"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9ec587a29f4228b21394c54fb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_603ff90c2d8efe13e2335b6b2b"`);
        await queryRunner.query(`DROP TABLE "product_store"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72222766636d2deaba06672045"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b4e1dd5c442deccc1ab286d6d"`);
        await queryRunner.query(`DROP TABLE "customer_store"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "chance"`);
        await queryRunner.query(`DROP TABLE "chance_process"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "rule"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TYPE "public"."customer_gender_enum"`);
        await queryRunner.query(`DROP TABLE "tier"`);
        await queryRunner.query(`DROP TABLE "campaign"`);
    }

}
