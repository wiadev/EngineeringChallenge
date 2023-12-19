import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class DataPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  email: string;

  @Column({
    length: 100,
  })
  machineName: string;

  @Column()
  partName: string;

  @Column()
  partValue: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  recordedAt: string;
}