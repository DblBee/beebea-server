import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1660747483140 implements MigrationInterface {
    name = 'initial1660747483140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "animation_trait" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "assignment_number" integer NOT NULL, "name" character varying(128) NOT NULL, "element_type" character varying NOT NULL, "animation" character varying(128) NOT NULL, CONSTRAINT "UQ_fc868c3e222901d74d0aa5556a0" UNIQUE ("animation"), CONSTRAINT "ANIMATION_TRAIT_UNIQUE" UNIQUE ("element_type", "assignment_number"), CONSTRAINT "PK_9201a82dbfa4f84ea6b13794a79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color_trait" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "assignment_number" integer NOT NULL, "name" character varying(128) NOT NULL, "element_type" character varying NOT NULL, "hex" character varying(10) NOT NULL, "rgb" character varying(20) NOT NULL, CONSTRAINT "UQ_907e3d9d60f15ae1dbb8d5352e9" UNIQUE ("hex"), CONSTRAINT "UQ_e45040d9bcd8e73fac44afb1506" UNIQUE ("rgb"), CONSTRAINT "COLOR_TRAIT_UNIQUE" UNIQUE ("element_type", "assignment_number"), CONSTRAINT "PK_56b4301996c9d412417531a5bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shape_trait" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "assignment_number" integer NOT NULL, "name" character varying(128) NOT NULL, "element_type" character varying NOT NULL, "shape" character varying(128) NOT NULL, CONSTRAINT "UQ_c784790aebf693a502cab46305a" UNIQUE ("shape"), CONSTRAINT "SHAPE_TRAIT_UNIQUE" UNIQUE ("element_type", "assignment_number"), CONSTRAINT "PK_a825106e5d72d1aa8b6387e8322" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beebea" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "mint_number" integer NOT NULL DEFAULT getnextmintnumber(), "name" character varying(128) NOT NULL, "creepy_name" character varying(128) NOT NULL, "html_creepy_name" text NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "generation" integer NOT NULL, "dna" character(66) NOT NULL, "bio" text, "is_ready" boolean NOT NULL DEFAULT true, "is_gestating" boolean NOT NULL DEFAULT false, "cooldown" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cooldown_index" integer NOT NULL DEFAULT '0', "color_trait1_id" integer, "color_trait2_id" integer, "color_trait3_id" integer, "color_trait4_id" integer, "color_trait5_id" integer, "color_trait6_id" integer, "color_trait7_id" integer, "color_trait8_id" integer, "shape_trait1_id" integer, "shape_trait2_id" integer, "animation1_id" integer, "hidden_trait_id" integer, "sire_id" integer, "matron_id" integer, CONSTRAINT "UQ_9ab7ec8cb4e8b9d86c87f23bf04" UNIQUE ("dna"), CONSTRAINT "PK_95d26902692e2bad1e02c6dce91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beebea_children" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_sire" boolean NOT NULL DEFAULT false, "is_matron" boolean NOT NULL DEFAULT false, "parent_id" integer, "child_id" integer, CONSTRAINT "REL_465ecca2f38117c02b2c0ba8c0" UNIQUE ("child_id"), CONSTRAINT "PK_5224b97fd0b798a9b12f5517d4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_6927f6f97d6070556388807b897" FOREIGN KEY ("color_trait1_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_4e51ec8fb37e0ea920fd5759b04" FOREIGN KEY ("color_trait2_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_b28a2c6dbe71a5a583c937a310b" FOREIGN KEY ("color_trait3_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_978c7c44ba6a90fb484bf09ab36" FOREIGN KEY ("color_trait4_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_7adf4f36329266b56ec60bc4910" FOREIGN KEY ("color_trait5_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_a523b55f773ca264ec8d759f8cf" FOREIGN KEY ("color_trait6_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_4d78045499834fbf97d21802085" FOREIGN KEY ("color_trait7_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_01c220643830078abeb3e9eaf00" FOREIGN KEY ("color_trait8_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_2cd010934c53167fadc532fcb8d" FOREIGN KEY ("shape_trait1_id") REFERENCES "shape_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_63bf60a27711909afff63652eb7" FOREIGN KEY ("shape_trait2_id") REFERENCES "shape_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_c829be4a96f16ec4b2828ebcee2" FOREIGN KEY ("animation1_id") REFERENCES "animation_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_52f75a8b5e40ccd6d7d7adcaa35" FOREIGN KEY ("hidden_trait_id") REFERENCES "animation_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_52f75a8b5e40ccd6d7d7adcaa35"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_c829be4a96f16ec4b2828ebcee2"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_63bf60a27711909afff63652eb7"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_2cd010934c53167fadc532fcb8d"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_01c220643830078abeb3e9eaf00"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_4d78045499834fbf97d21802085"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_a523b55f773ca264ec8d759f8cf"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_7adf4f36329266b56ec60bc4910"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_978c7c44ba6a90fb484bf09ab36"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_b28a2c6dbe71a5a583c937a310b"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_4e51ec8fb37e0ea920fd5759b04"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_6927f6f97d6070556388807b897"`);
        await queryRunner.query(`DROP TABLE "beebea_children"`);
        await queryRunner.query(`DROP TABLE "beebea"`);
        await queryRunner.query(`DROP TABLE "shape_trait"`);
        await queryRunner.query(`DROP TABLE "color_trait"`);
        await queryRunner.query(`DROP TABLE "animation_trait"`);
    }

}
