import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCustomerClassificationRela1679930800573 implements MigrationInterface {
    name = 'UpdateCustomerClassificationRela1679930800573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_e75af2f2644874dff158552acce"`);
        await queryRunner.query(`CREATE TABLE "customer_classification" ("classificationId" integer NOT NULL, "customerId" integer NOT NULL, CONSTRAINT "PK_c76961e34f8e5c78d07630e2152" PRIMARY KEY ("classificationId", "customerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b2471140d5076a7098c3aadedf" ON "customer_classification" ("classificationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_32f9e336ebb714f7dda08812b6" ON "customer_classification" ("customerId") `);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "classificationId"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "tax_code" character varying`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679930801868'`);
        await queryRunner.query(`ALTER TABLE "customer_classification" ADD CONSTRAINT "FK_b2471140d5076a7098c3aadedf8" FOREIGN KEY ("classificationId") REFERENCES "classification"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "customer_classification" ADD CONSTRAINT "FK_32f9e336ebb714f7dda08812b63" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_classification" DROP CONSTRAINT "FK_32f9e336ebb714f7dda08812b63"`);
        await queryRunner.query(`ALTER TABLE "customer_classification" DROP CONSTRAINT "FK_b2471140d5076a7098c3aadedf8"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "rule" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "tier" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "chance" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "chance_process" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "updated_at" SET DEFAULT '1679739176486'`);
        await queryRunner.query(`ALTER TABLE "campaign" ALTER COLUMN "created_at" SET DEFAULT '1679739176485'`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "tax_code"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "classificationId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32f9e336ebb714f7dda08812b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2471140d5076a7098c3aadedf"`);
        await queryRunner.query(`DROP TABLE "customer_classification"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_e75af2f2644874dff158552acce" FOREIGN KEY ("classificationId") REFERENCES "classification"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
