import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Restaurant } from "./Restaurant";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
    restaurantId: number

    @Column({ type: 'real' })
    rating: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    comment: string

    @Column({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
    date: string
}