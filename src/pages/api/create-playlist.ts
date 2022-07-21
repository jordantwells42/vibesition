import { getSearchById, createPlaylist } from '../../libs/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  
  if (query.ids && query.name && token){
    const ids = query.ids as string;
    const name = query.name as string;
    const desc = query.description as string
    const accessToken = token.accessToken as string;
    const response = await createPlaylist(accessToken, name, desc, ids);
    return res.status(200).json(response);
  }
  return res.status(400).json({error: "No id provided"});

};

export default handler;