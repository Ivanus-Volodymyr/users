import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '../interfaces';

@Entity('users', { database: 'test' })
export class User implements IUser {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
        id: number;

  @Column({
      type: 'varchar',
      width: 250,
      nullable: false,
  })
      firstName: string;

  @Column({
      type: 'varchar',
      width: 250,
      nullable: false,
  })
      lastName: string;

  @Column({
      type: 'varchar',
      width: 250,
      nullable: false,
      unique: false,
  })
      phone: string;

  @Column({
      type: 'varchar',
      width: 250,
      nullable: false,
      unique: true,
  })
      email: string;

  @Column({
      type: 'varchar',
      width: 250,
      nullable: false,
  })
      password: string;
}
