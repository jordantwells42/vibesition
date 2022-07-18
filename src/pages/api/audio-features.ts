import {  getAudioFeatures } from '../../libs/spotify';

import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  
  if (query.ids && token){
    const {ids} = query;
    const accessToken = token.accessToken as string;
    const response = await getAudioFeatures(accessToken, ids.split(",") as string[]);
    const {audio_features} = await response.json();

    return res.status(200).json(audio_features);
  }


};

export default handler;