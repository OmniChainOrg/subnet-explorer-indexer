import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Block {
  @PrimaryColumn("int") height!: number;
  @Column() hash!: string;
  @Column("timestamp") timestamp!: Date;
}
