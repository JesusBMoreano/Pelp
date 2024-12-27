import { Application, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { ReviewController } from '../controllers/ReviewController';

export const reviewRoutes = (app: Application, dataSource: DataSource): void => {
    const reviewController = new ReviewController(dataSource);

    app.post('/review/newReview', (req: Request, res: Response) => reviewController.newReview(req, res));
    app.get('/review/:id', (req: Request, res: Response) => reviewController.getReview(req, res));
    app.get('/reviews', (req: Request, res: Response) => reviewController.getReviews(req, res));
    app.put('/review/:id', (req: Request, res: Response) => reviewController.updateReview(req, res));
    app.delete('/review/:id', (req: Request, res: Response) => reviewController.deleteReview(req, res));
};