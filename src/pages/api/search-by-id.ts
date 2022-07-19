import { getSearchById } from '../../libs/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  
  if (query.ids && token){
    const ids = query.ids as string;
    const accessToken = token.accessToken as string;
    const response = await getSearchById(accessToken, ids);
    const {tracks} = await response.json();
    console.log("yo", tracks)
    return res.status(200).json(tracks);
  }
  return res.status(400).json({error: "No id provided"});

};

export default handler;