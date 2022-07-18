import { getSearchById } from '../../libs/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  const {query} = req;
  console.log(query)
  
  if (query.id && token){
    const id = query.id as string;
    const accessToken = token.accessToken as string;
    const response = await getSearchById(accessToken, id);
    const json = await response.json();
    console.log(json)
    return res.status(200).json(json);
  }


};

export default handler;