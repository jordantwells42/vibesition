import {  getAudioFeatures } from '../../libs/spotify';

import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  
  if (query.startId && query.endId && token){
    const {startId, endId} = query;
    const accessToken = token.accessToken as string;
    const response = await getAudioFeatures(accessToken, [startId as string, endId  as string]);
    const json = await response.json();
    console.log(json)
    return res.status(200).json(json);
  }


};

export default handler;