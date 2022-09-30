import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1661981794079 implements MigrationInterface {
    name = 'initial1661981794079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "animation_trait" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "assignment_number" integer NOT NULL, "name" character varying(128) NOT NULL, "element_type" character varying NOT NULL, "animation" character varying(128) NOT NULL, CONSTRAINT "UQ_fc868c3e222901d74d0aa5556a0" UNIQUE ("animation"), CONSTRAINT "ANIMATION_TRAIT_UNIQUE" UNIQUE ("element_type", "assignment_number"), CONSTRAINT "PK_9201a82dbfa4f84ea6b13794a79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color_trait" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "assignment_number" integer NOT NULL, "name" character varying(128) NOT NULL, "element_type" character varying NOT NULL, "hex" character varying(10) NOT NULL, "rgb" character varying(20) NOT NULL, CONSTRAINT "UQ_907e3d9d60f15ae1dbb8d5352e9" UNIQUE ("hex"), CONSTRAINT "UQ_e45040d9bcd8e73fac44afb1506" UNIQUE ("rgb"), CONSTRAINT "COLOR_TRAIT_UNIQUE" UNIQUE ("element_type", "assignment_number"), CONSTRAINT "PK_56b4301996c9d412417531a5bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shape_trait" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "assignment_number" integer NOT NULL, "name" character varying(128) NOT NULL, "element_type" character varying NOT NULL, "shape" character varying(128) NOT NULL, CONSTRAINT "UQ_c784790aebf693a502cab46305a" UNIQUE ("shape"), CONSTRAINT "SHAPE_TRAIT_UNIQUE" UNIQUE ("element_type", "assignment_number"), CONSTRAINT "PK_a825106e5d72d1aa8b6387e8322" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beebea" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "mint_number" integer NOT NULL DEFAULT getnextmintnumber(), "name" character varying(128) NOT NULL, "creepy_name" character varying(128) NOT NULL, "html_creepy_name" text NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "generation" integer NOT NULL, "dna" character(66) NOT NULL, "bio" text, "is_ready" boolean NOT NULL DEFAULT true, "is_gestating" boolean NOT NULL DEFAULT false, "cooldown" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cooldown_index" integer NOT NULL DEFAULT '0', "primary_color_trait_id" integer, "secondary_color_trait_id" integer, "accent_color_trait_id" integer, "highlight_color_trait_id" integer, "complementary_color_trait_id" integer, "polymeric_color_trait_id" integer, "environmental_color_trait_id" integer, "recessive_color_trait_id" integer, "primary_shape_trait_id" integer, "secondary_shape_trait_id" integer, "primary_animation_trait_id" integer, "hidden_trait_id" integer, "sire_id" integer, "matron_id" integer, CONSTRAINT "UQ_170027a5902af769b5445773924" UNIQUE ("mint_number"), CONSTRAINT "UQ_9ab7ec8cb4e8b9d86c87f23bf04" UNIQUE ("dna"), CONSTRAINT "PK_95d26902692e2bad1e02c6dce91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "beebea_children" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "is_sire" boolean NOT NULL DEFAULT false, "is_matron" boolean NOT NULL DEFAULT false, "parent_id" integer, "child_id" integer, CONSTRAINT "REL_465ecca2f38117c02b2c0ba8c0" UNIQUE ("child_id"), CONSTRAINT "PK_5224b97fd0b798a9b12f5517d4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_2082b90c94f27156adaaadb51b6" FOREIGN KEY ("primary_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_efb052d0173b580aa122094991d" FOREIGN KEY ("secondary_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_62a44538ad615f3df37d7b18e17" FOREIGN KEY ("accent_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_fb7979e73503d0d1265de8a25aa" FOREIGN KEY ("highlight_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_cc828e385d55d318c884c800250" FOREIGN KEY ("complementary_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_b47ec245249fc268b25800f05a3" FOREIGN KEY ("polymeric_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_07f9a7fe2430c7c065c7713dc9f" FOREIGN KEY ("environmental_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_2db2f841a53a41835e6f0fa7781" FOREIGN KEY ("recessive_color_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_1cd671f5acbadb7c4419a056b95" FOREIGN KEY ("primary_shape_trait_id") REFERENCES "shape_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_f15f7aeae145c8791846ad66a4a" FOREIGN KEY ("secondary_shape_trait_id") REFERENCES "shape_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_226449694aef348b2b94baa460e" FOREIGN KEY ("primary_animation_trait_id") REFERENCES "animation_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "beebea" ADD CONSTRAINT "FK_52f75a8b5e40ccd6d7d7adcaa35" FOREIGN KEY ("hidden_trait_id") REFERENCES "color_trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_226449694aef348b2b94baa460e"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_f15f7aeae145c8791846ad66a4a"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_1cd671f5acbadb7c4419a056b95"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_2db2f841a53a41835e6f0fa7781"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_07f9a7fe2430c7c065c7713dc9f"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_b47ec245249fc268b25800f05a3"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_cc828e385d55d318c884c800250"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_fb7979e73503d0d1265de8a25aa"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_62a44538ad615f3df37d7b18e17"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_efb052d0173b580aa122094991d"`);
        await queryRunner.query(`ALTER TABLE "beebea" DROP CONSTRAINT "FK_2082b90c94f27156adaaadb51b6"`);
        await queryRunner.query(`DROP TABLE "beebea_children"`);
        await queryRunner.query(`DROP TABLE "beebea"`);
        await queryRunner.query(`DROP TABLE "shape_trait"`);
        await queryRunner.query(`DROP TABLE "color_trait"`);
        await queryRunner.query(`DROP TABLE "animation_trait"`);
    }

}
