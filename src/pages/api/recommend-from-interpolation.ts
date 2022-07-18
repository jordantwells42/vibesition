import { getRecommendation } from '../../libs/spotify';

import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  
  if (query.interpolation && token){
    const {interpolation} = query;
    const interpolationObj = JSON.parse(interpolation as string);
    const accessToken = token.accessToken as string;
    const response = await getRecommendation(accessToken, interpolationObj);
    const json = await response.json();
    return res.status(200).json(json.tracks[0]);
  }


};

export default handler;