import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class FoodCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
