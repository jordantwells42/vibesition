/* eslint-disable @next/next/no-img-element */
import PlusIcon from './plusicon'
import { motion } from 'framer-motion'
import tinycolor from 'tinycolor2';
import textColor from '../libs/textColor';
export default function SongInSearch ({
  song,
  setSong,
  color
}: {
  song: any
  setSong: ({
    id,
    name,
    img
  }: {
    id: string
    name: string
    img: string
  }) => void
  color: tinycolor.Instance
}) {
  return (
    <motion.div
      initial={{ x: -20, height: '0%', backgroundColor: color.toHexString(), color: textColor(color, [tinycolor("white")]) }}
      animate={{ x: 0, height: '100%', backgroundColor: color.clone().lighten(10).toHexString(), color: textColor(color.clone().lighten(10), [tinycolor("white")]) }}
      whileHover={{ scale: 1.05 }}
      onClick={() =>
        setSong({
          id: song.id,
          name: song.name,
          img: song.album.images[1].url
        })
      }
      className='px-4 md:px-8 m-1 hover:cursor-pointer rounded-2xl md:p-2 flex flex-row w-full justify-start items-center'
      key={song.id}
    >
      <img
        className='object-contain w-10 h-10 md:w-20 md:h-20 aspect-square'
        src={song.album.images[1].url}
        alt='tites'
      />
      <div className='overflow-x-hidden flex flex-col m-2 w-full justify-center items-start'>
        <h1 className='whitespace-nowrap truncate font-semibold md:text-xl'>{song.name}</h1>
        <p className='whitespace-nowrap truncate md:text-xl'>{song.artists[0].name}</p>
      </div>
      <audio className='w-1/2 hidden md:block mx-4' controls>
        <source
          className='bg-slate-900'
          src={song.preview_url}
          type='audio/mp3'
        />
      </audio>
      <PlusIcon
        className='h-6 w-6 cursor-pointer'
        onClick={() =>
          setSong({
            id: song.id,
            name: song.name,
            img: song.album.images[1].url
          })
        }
      />
    </motion.div>
  )
}
