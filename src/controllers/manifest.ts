import {NextFunction, Request, Response} from 'express';
import {IManifestService} from '../services/types';
/**
 * Handler to return the app manifest.
 * @param req
 * @param res
 * @param next
 */
export const show = (manifestService:IManifestService) => (_req: Request, res: Response, _next: NextFunction) => {
  res.json(manifestService.getManifest());
};
