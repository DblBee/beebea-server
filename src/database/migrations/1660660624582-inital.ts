import { MigrationInterface, QueryRunner } from "typeorm";

export class inital1660660624582 implements MigrationInterface {
    name = 'inital1660660624582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "beebea" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(128) NOT NULL, "creepy_name" character varying(128) NOT NULL, "html_creepy_name" text NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "generation" integer NOT NULL, "dna" character(66) NOT NULL, "image_url" character varying(512), "image_urlcdn" character varying(512), "bio" text, "is_ready" boolean NOT NULL DEFAULT true, "is_gestating" boolean NOT NULL DEFAULT false, "cooldown" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cooldown_index" integer NOT NULL DEFAULT '0', "sire_id" integer, "matron_id" integer, CONSTRAINT "UQ_9ab7ec8cb4e8b9d86c87f23bf04" UNIQUE ("dna"), CONSTRAINT "PK_95d26902692e2bad1e02c6dce91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beebea_children" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_sire" boolean NOT NULL DEFAULT false, "is_matron" boolean NOT NULL DEFAULT false, "parent_id" integer, "child_id" integer, CONSTRAINT "REL_465ecca2f38117c02b2c0ba8c0" UNIQUE ("child_id"), CONSTRAINT "PK_5224b97fd0b798a9b12f5517d4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_46e27def777e5e0e25f874a719f" FOREIGN KEY ("sire_id") REFERENCES "beebea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_ecefa7a05e14a7122378f7bc900" FOREIGN KEY ("matron_id") REFERENCES "beebea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea_children" ADD CONSTRAINT "FK_9cd56d56510a8e6020b7151b13d" FOREIGN KEY ("parent_id") REFERENCES "beebea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea_children" ADD CONSTRAINT "FK_465ecca2f38117c02b2c0ba8c02" FOREIGN KEY ("child_id") REFERENCES "beebea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beebea_children" DROP CONSTRAINT "FK_465ecca2f38117c02b2c0ba8c02"`);
        await queryRunner.query(`ALTER TABLE "beebea_children" DROP CONSTRAINT "FK_9cd56d56510a8e6020b7151b13d"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_ecefa7a05e14a7122378f7bc900"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_46e27def777e5e0e25f874a719f"`);
        await queryRunner.query(`DROP TABLE "beebea_children"`);
        await queryRunner.query(`DROP TABLE "beebea"`);
    }

}
