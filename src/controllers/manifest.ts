import {NextFunction, Request, Response} from 'express';
import jsonManifest from '../manifest';
/**
 * Handler to return the app manifest.
 * @param req
 * @param res
 * @param next
 */
export const show = (_req: Request, res: Response, _next: NextFunction) => {
  res.json(jsonManifest);
};
