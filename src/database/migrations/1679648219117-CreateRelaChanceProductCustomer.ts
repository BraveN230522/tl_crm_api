import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelaChanceProductCustomer1679648219117 implements MigrationInterface {
    name = 'CreateRelaChanceProductCustomer1679648219117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`CREATE TABLE "product_chance" ("chanceId" integer NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_fe0b83dcfdffeedcaa74b226730" PRIMARY KEY ("chanceId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ce04fa36d02d43a289ac18c7ef" ON "product_chance" ("chanceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78cdae4971c01abe5421594ae9" ON "product_chance" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "desc"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chance" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" bigint NOT NULL DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_at" bigint NOT NULL DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "desc" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "cost" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "product_store" DROP CONSTRAINT "FK_603ff90c2d8efe13e2335b6b2b9"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_717057f3f11a007030181422152"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679648219616'`);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP CONSTRAINT "PK_fe0b83dcfdffeedcaa74b226730"`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD CONSTRAINT "PK_ce04fa36d02d43a289ac18c7ef3" PRIMARY KEY ("chanceId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78cdae4971c01abe5421594ae9"`);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP CONSTRAINT "PK_ce04fa36d02d43a289ac18c7ef3"`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD CONSTRAINT "PK_fe0b83dcfdffeedcaa74b226730" PRIMARY KEY ("chanceId", "productId")`);
        await queryRunner.query(`CREATE INDEX "IDX_78cdae4971c01abe5421594ae9" ON "product_chance" ("productId") `);
        await queryRunner.query(`ALTER TABLE "chance" ADD CONSTRAINT "FK_57170f50c83913ce7b5c1980098" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD CONSTRAINT "FK_ce04fa36d02d43a289ac18c7ef3" FOREIGN KEY ("chanceId") REFERENCES "chance"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD CONSTRAINT "FK_78cdae4971c01abe5421594ae9d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_store" ADD CONSTRAINT "FK_603ff90c2d8efe13e2335b6b2b9" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_717057f3f11a007030181422152" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_717057f3f11a007030181422152"`);
        await queryRunner.query(`ALTER TABLE "product_store" DROP CONSTRAINT "FK_603ff90c2d8efe13e2335b6b2b9"`);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP CONSTRAINT "FK_78cdae4971c01abe5421594ae9d"`);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP CONSTRAINT "FK_ce04fa36d02d43a289ac18c7ef3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP CONSTRAINT "FK_57170f50c83913ce7b5c1980098"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78cdae4971c01abe5421594ae9"`);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP CONSTRAINT "PK_fe0b83dcfdffeedcaa74b226730"`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD CONSTRAINT "PK_ce04fa36d02d43a289ac18c7ef3" PRIMARY KEY ("chanceId")`);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD "productId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_78cdae4971c01abe5421594ae9" ON "product_chance" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product_chance" DROP CONSTRAINT "PK_ce04fa36d02d43a289ac18c7ef3"`);
        await queryRunner.query(`ALTER TABLE "product_chance" ADD CONSTRAINT "PK_fe0b83dcfdffeedcaa74b226730" PRIMARY KEY ("chanceId", "productId")`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_717057f3f11a007030181422152" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_store" ADD CONSTRAINT "FK_603ff90c2d8efe13e2335b6b2b9" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "desc"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "chance" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "desc" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "cost" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_at" bigint NOT NULL DEFAULT '1679470429123'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" bigint NOT NULL DEFAULT '1679470429123'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78cdae4971c01abe5421594ae9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce04fa36d02d43a289ac18c7ef"`);
        await queryRunner.query(`DROP TABLE "product_chance"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
