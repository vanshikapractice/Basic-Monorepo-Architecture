import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from '@/config';
import { apiRouter } from '@/routes';
import { errorHandler, notFoundHandler, requestLogger } from '@/middleware';

export function createApp(): Application {
  const app = express();

  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use(requestLogger);

  app.use(`${config.apiPrefix}`, apiRouter);

  app.get('/', (_req: Request, res: Response) => {
    res.json({
      name: 'Payment API',
      version: process.env.npm_package_version || '1.0.0',
      environment: config.env,
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}