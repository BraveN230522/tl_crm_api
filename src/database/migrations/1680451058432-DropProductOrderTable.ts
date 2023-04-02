import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropProductOrderTable1680451058432 implements MigrationInterface {
  name = 'DropProductOrderTable1680451058432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_order"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`"`);
  }
}
