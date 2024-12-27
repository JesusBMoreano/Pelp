import { Request, Response } from 'express'
import { DataSource } from 'typeorm';
import { Review } from "../entity/Review"

export class ReviewController {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async newReview(req: Request, res: Response) {
        const reviewRepository = this.dataSource.getRepository(Review);
        const review = reviewRepository.create(req.body);

        try {
            await reviewRepository.save(review);
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ message: 'Error creating review', error });
        }
    }

    async getReview(req: Request, res: Response) {
        const reviewRepository = this.dataSource.getRepository(Review);
        const { id } = req.params;

        try {
            const review = await reviewRepository.findOneOrFail({ where: { id: Number(id) } });
            res.json(review);
        } catch (error) {
            res.status(404).json({ message: 'Review not found', error });
        }
    }

    async getReviews(req: Request, res: Response) {
        const reviewRepository = this.dataSource.getRepository(Review);

        try {
            const reviews = await reviewRepository.find();
            res.json(reviews);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching reviews', error });
        }
    }

    async updateReview(req: Request, res: Response) {
        const reviewRepository = this.dataSource.getRepository(Review);
        const { id } = req.params;

        try {
            await reviewRepository.update(id, req.body);
            const updatedReview = await reviewRepository.findOneOrFail({ where: { id: Number(id) } });
            res.json(updatedReview);
        } catch (error) {
            res.status(400).json({ message: 'Error updating review', error });
        }
    }

    async deleteReview(req: Request, res: Response) {
        const reviewRepository = this.dataSource.getRepository(Review);
        const { id } = req.params;

        try {
            await reviewRepository.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: 'Error deleting review', error });
        }
    }
}