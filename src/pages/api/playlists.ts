import {getUsersPlaylists} from '../../libs/spotify';
import {getSession} from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({req});
  if (token){
    const accessToken = token.accessToken as string;
    const response = await getUsersPlaylists(accessToken);
    const {items} = await response.json();
  
    return res.status(200).json({items});
  }


};

export default handler;