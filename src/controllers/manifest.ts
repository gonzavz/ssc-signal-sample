import {NextFunction, Request, Response} from 'express';
import {IManifestService} from '../services/types';

export const show = (manifestService:IManifestService) =>
  (_req: Request, res: Response, _next: NextFunction) => {
    res.json(manifestService.getManifest());
  };
