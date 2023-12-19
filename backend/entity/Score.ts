import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {
  AssemblyLinePart,
  MachineType,
  PaintingStationPart,
  QualityControlStationPart,
  WeldingRobotPart,
} from '../../native-app/data/types';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  email: string;

  @Column('simple-json', { nullable: true })
  machines: Record<
      MachineType,
      Record<
        | WeldingRobotPart
        | AssemblyLinePart
        | PaintingStationPart
        | QualityControlStationPart,
        string
      >
    >;

  @Column({ nullable: true })
  factory: string;

  @Column({ nullable: true })
  weldingRobot: string;

  @Column({ nullable: true })
  paintingStation: string;

  @Column({ nullable: true })
  assemblyLine: string;

  @Column({ nullable: true })
  qualityControlStation: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  recordedAt: string;
}