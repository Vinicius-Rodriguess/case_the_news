import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Opening } from '../opening/opening.entity';

@Entity({ name: 'tb_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ default: 0 })
  totalStreak: number;

  @Column({ default: 0 })
  consecutiveStreak: number;

  @Column({ default: 0 })
  highestConsecutiveStreak: number;

  @Column({ type: 'date', nullable: true })
  lastOpenedAt: string;

  @OneToMany(() => Opening, (opening) => opening.user)
  openings: Opening[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
