import { getSearch } from '../../libs/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  console.log(query)
  
  if (query.q && token){
    const q = query.q as string;
    const accessToken = token.accessToken as string;
    const response = await getSearch(accessToken, q);
    const {tracks} = await response.json();
    return res.status(200).json(tracks.items);
  }


};

export default handler;