import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['twitterId'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  twitterId!: string;

  @Column()
  displayName!: string;
}
