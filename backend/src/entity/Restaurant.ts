import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { FoodCategory } from "./FoodCategory";
import { Cuisine } from "./Cuisine";
import { Image } from "./Image";
import { Review } from "./Review";


@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @ManyToMany(() => Cuisine)
  @JoinTable()
  cuisines: Cuisine[];

  @ManyToMany(() => FoodCategory)
  @JoinTable()
  foodCategories: FoodCategory[];

  @OneToMany(() => Review, (image) => image.restaurantId)
  @JoinTable()
  reviews: Review[];

  @OneToMany(() => Image, (image) => image.restaurant)
  photos: Image[];

  @Column()
  rating: number;

  // This is the number of ratings received by the restaurant
  @Column({ default: 0 })
  ratingCount: number;

  // This is price range in terms of $$ or $$$ or $$$$
  @Column()
  price: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column()
  description: string;

  @Column()
  openHour: string;

  @Column()
  closeHour: string;

  @Column()
  ownerId: number;

  @Column()
  openStatus: boolean;
  
}
