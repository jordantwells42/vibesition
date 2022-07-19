/* eslint-disable @next/next/no-img-element */
import PlusIcon from "./plusicon";
import { motion } from "framer-motion";
import tinycolor from "tinycolor2";
import textColor from "../libs/textColor";
export default function SongInSearch({
  song,
  setSong,
  color,
}: {
  song: any;
  setSong: ({
    id,
    name,
    img,
  }: {
    id: string;
    name: string;
    img: string;
  }) => void;
  color: tinycolor.Instance;
}) {
  return (
    <motion.div layout
      initial={{
        x: -20,
        height: "0%",
        backgroundColor: color.toHexString(),
        color: textColor(color, [tinycolor("white")]),
      }}
      animate={{
        x: 0,
        height: "100%",
        backgroundColor: color.clone().lighten(10).toHexString(),
        color: textColor(color.clone().lighten(10), [tinycolor("white")]),
      }}
      whileHover={{ scale: 1.05 }}
      onClick={() =>
        setSong({
          id: song.id,
          name: song.name,
          img: song.album.images[1].url,
        })
      }
      className="m-1 flex w-full flex-row items-center justify-start rounded-2xl px-4 hover:cursor-pointer md:p-2 md:px-8"
      key={song.id}
    >
      <img
        className="aspect-square h-10 w-10 object-contain md:h-20 md:w-20"
        src={song.album.images[1].url}
        alt="tites"
      />
      <div className="m-2 flex w-full flex-col items-start justify-center overflow-x-hidden">
        <h1 className="truncate whitespace-nowrap font-semibold md:text-xl">
          {song.name}
        </h1>
        <p className="truncate whitespace-nowrap md:text-xl">
          {song.artists[0].name}
        </p>
      </div>
      <audio className="mx-4 hidden w-1/2 md:block" controls>
        <source
          className="bg-slate-900"
          src={song.preview_url}
          type="audio/mp3"
        />
      </audio>
      <PlusIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() =>
          setSong({
            id: song.id,
            name: song.name,
            img: song.album.images[1].url,
          })
        }
      />
    </motion.div>
  );
}
