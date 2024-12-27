import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Restaurant } from "./Restaurant";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filepath: string;

  @Column()
  filename: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.photos)
  restaurant: Restaurant;
}
