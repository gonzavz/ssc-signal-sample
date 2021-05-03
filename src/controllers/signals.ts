import {NextFunction, Request, Response} from 'express';
import SecurityScorecard from '../libs/ssc';
const sscToken = '';
const ssc = new SecurityScorecard({
  apiBaseUrl: 'https://platform-api.securityscorecard.tech',
  token: sscToken,
});

export const sendSignal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {type} = req.params;
    const body = req.body;
    await ssc.apiCall({path: '/signals/by-type', method: 'POST', body: {}});
    res.json({type, body});
  } catch (err) {
    next(err);
  }
};

