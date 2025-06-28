import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryColumn() hash!: string;
  @Column("int") height!: number;
  @Column("jsonb") body!: any;
}
