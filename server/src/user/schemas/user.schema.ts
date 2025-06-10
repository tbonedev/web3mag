import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  hashedPassword: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  activationLink: string | null;

  @Column({ type: 'boolean', default: false })
  isActivated: boolean;

  @Column({
    type: 'enum',
    unique: true,
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
