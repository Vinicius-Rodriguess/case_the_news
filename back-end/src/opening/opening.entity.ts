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
  newsletterId: string;

  @Column({ type: 'date', nullable: false })
  openedAt: string;

  @Column({ type: 'date', nullable: false })
  publicationDate: string;

  @Column({ length: 255, nullable: true, default: '' })
  utmSource?: string;

  @Column({ length: 255, nullable: true, default: '' })
  utmMedium?: string;

  @Column({ length: 255, nullable: true, default: '' })
  utmCampaign?: string;

  @Column({ length: 255, nullable: true, default: '' })
  utmChannel?: string;

  @ManyToOne(() => User, (user) => user.openings, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
