import { getRecommendation } from '../../libs/spotify';

import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  if (query.interpolation && token){
    const {interpolation} = query;
    let limit: number;
    if (query.limit){
      limit = Number(query.limit);
    } else {
      limit = 1
    }
    const interpolationObj = JSON.parse(interpolation as string);
    const accessToken = token.accessToken as string;
    const response = await getRecommendation(accessToken, interpolationObj, limit);
    const json = await response.json();
    return res.status(200).json(json.tracks);
  }


};

export default handler;