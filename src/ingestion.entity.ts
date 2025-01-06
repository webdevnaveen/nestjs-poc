import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string; // e.g., "in-progress", "completed", "failed"

  @Column()
  triggeredBy: string; // User ID of the person who triggered ingestion

  @Column({ nullable: true })
  errorMessage: string; // If ingestion fails

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
