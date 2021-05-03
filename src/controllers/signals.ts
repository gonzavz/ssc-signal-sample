import {NextFunction, Request, Response} from 'express';
import {ISSCApiService} from '../services/types';

export const sendSignal = (sscApiService:ISSCApiService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const signal = await sscApiService.sendSignal(body);
      res.json(signal);
    } catch (err) {
      next(err);
    }
  };
