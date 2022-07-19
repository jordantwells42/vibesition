/* eslint-disable @next/next/no-img-element */
import tinycolor from "tinycolor2";
import { motion } from "framer-motion";
import textColor from "../libs/textColor";
import Player from "./player";
import { useRef, useState } from "react";
export default function SongCard({
  song,
  color,
}: {
  song: any;
  color: tinycolor.Instance;
}) {
  const playerRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const handleClick = () => {
    if (playerRef.current) {
      if (playing) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const variants:any ={
    playing: {
        scale: 1.02,
        transition: {repeat:Infinity,repeatType: "mirror", ease:"easeInOut", duration: 0.3}
    },
    paused: {
        scale: 1.0,
        transition:{}
    }
  }

  return (
    song.album && (
      <motion.div
        layout
        style={{
          backgroundColor: color ? color.toHexString() : "#222",
          color: color ? textColor(color, [tinycolor("white")]) : "white",
        }}
        initial={{ x: -20, height: "0%" }}
        animate={{ x: 0, height: "100%" }}
        className="relative m-2 flex w-full flex-col items-center justify-start rounded-2xl p-2 hover:cursor-pointer hover:bg-green-700 md:w-1/5 md:p-2"
        key={song.id}
        onClick={song.preview_url && handleClick}
      >
        <motion.div
        variants={variants}
        animate={playing?"playing":"paused"}
        className="h-full w-full relative">
          <img
            className="aspect-square w-full rounded-xl object-contain hover:brightness-50"
            src={song.album.images[1].url}
            alt="tites"
          ></img>
          {song.preview_url && <div className="absolute rounded-xl hover:backdrop-brightness-50 w-full h-full opacity-0 hover:opacity-100 flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            {!playing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-1/2 w-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-1/2 w-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>}
        </motion.div>
        <div className="m-2 flex w-full flex-col items-center justify-center overflow-x-hidden">
          <h1 className="w-full truncate whitespace-nowrap text-left font-semibold">
            {song.name}
          </h1>
          <p className="w-full truncate whitespace-nowrap text-left">
            {song.artists[0].name}
          </p>
        </div>
        <audio ref={playerRef} className="w-full">
          <source src={song.preview_url}></source>
        </audio>
      </motion.div>
    )
  );
}
