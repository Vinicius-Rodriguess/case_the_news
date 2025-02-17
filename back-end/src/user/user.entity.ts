import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  totalStreak: number;

  @Column({ default: 0 })
  consecutiveStreak: number;

  @Column({ default: 0 })
  highestConsecutiveStreak: number;

  @Column({ type: 'date', nullable: true })
  lastOpenedAt: string;
}
