import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export interface BaseEvent {
  id: string;
  type: string;
  payload: Record<string, any>;
  timestamp: Date;
}

@Entity('events')
export class EventStoreEntity implements BaseEvent {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  type: string;

  @Column({ type: 'jsonb' }) 
  payload: Record<string, any>;

  @CreateDateColumn({ type: 'timestamptz' })
  timestamp: Date;
}