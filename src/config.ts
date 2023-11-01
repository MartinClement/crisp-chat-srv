import { Application } from 'express';
import * as express from 'express';
import compression from "compression";
import cors from 'cors';


const corsOption = {
  origin: '*',
  credentials: true,
};

export default function expressConfig(app: Application): Application {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOption));
  app.use(compression());

  return app;
}