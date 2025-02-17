import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
