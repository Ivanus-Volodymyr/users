import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1646404215751 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL,
                phone VARCHAR(250) NOT NULL,
                email VARCHAR(250) NOT NULL UNIQUE,
                password VARCHAR(250) NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Users
        `);
    }
}
