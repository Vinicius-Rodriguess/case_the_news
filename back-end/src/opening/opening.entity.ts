import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'tb_openings' })
export class Opening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  newsletter_id: string;

  @Column({ type: 'date', nullable: false })
  opened_at: string;

  @Column({ type: 'date', nullable: false })
  data_publicacao: string;

  @ManyToOne(() => User, (user) => user.openings, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
