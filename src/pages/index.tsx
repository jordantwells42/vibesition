/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";

import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import SpotifySearch from "../components/spotifysearch";
import Link from "next/link";
import TabButton from "../components/tabbutton";
import tinycolor from "tinycolor2";
import featuresToColors from "../libs/featuresToColor";
import textColor from "../libs/textColor";
import Login from "../components/login";

/*
TODO: 

[] - Get audio features of interpolated songs
[] - Ensure that the interpolated songs are unique 
[] - Style results page
[] - Allow export to Spotify playlists
[] - Allow sharing of url to share gradient
[] - General UI things

*/

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [startSong, setStartSong] = useState({ id: "", name: "", img: "" });
  const [endSong, setEndSong] = useState({ id: "", name: "", img: "" });
  const [openTab, setOpenTab] = useState<number>(0);
  const [startColor, setStartColor] = useState(tinycolor("#333333"));
  const [endColor, setEndColor] = useState(tinycolor("#222222"));

  useEffect(() => {
    fetch("/api/audio-features?ids=" + startSong.id + "," + endSong.id)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          setStartColor(featuresToColors(data[0]));
        }
        if (data[1]) {
          setEndColor(featuresToColors(data[1]));
        }
      });
  }, [startSong, endSong]);

  if (session) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden bg-slate-700  text-white">
        <div className="w-full md:w-5/6 relative ">
          <Link href="/">
            <a>
        <img src="/logo.svg" className="w-20 absolute top-0 left-5 md:top-5 lg:left-10 " />
        </a>
        </Link>
        </div>
        <div className="flex py-10 h-full w-5/6 flex-col items-center justify-center lg:w-3/4">
          <h1 className="text-4xl font-bold italic">Vibesition</h1>
          <div className="m-2"></div>
          <h2 className="text-center text-2xl">Create a seamless <i>vibe</i> transition from song to another</h2>
          <div className="m-4"></div>
          <div className="flex w-full flex-row items-center justify-center font-semibold">
            <TabButton
              tabNumber={0}
              color={startColor}
              setOpenTab={setOpenTab}
              display={openTab === 0}
              song={startSong}
            >
              <h1
                style={{ color: textColor(startColor, [tinycolor("white")]) }}
                className="m-2 font-semibold md:text-xl"
              >
                Start Song
              </h1>
            </TabButton>
            <TabButton
              tabNumber={1}
              color={endColor}
              setOpenTab={setOpenTab}
              display={openTab === 1}
              song={endSong}
            >
              <h1
                style={{ color: textColor(endColor, [tinycolor("white")]) }}
                className="m-2  md:text-xl"
              >
                End Song
              </h1>
            </TabButton>
            
              <button
                style={{
                  backgroundColor:
                    startSong.id && endSong.id
                      ? tinycolor("#1ed760").desaturate(20).toHexString()
                      : tinycolor("#1ed760").desaturate(40).toHexString(),
                }}
                className={`flex h-20 w-1/3 flex-row font-bold items-center justify-center rounded-tr-xl p-2 md:text-xl`}
                onClick={() => setOpenTab(2)}
              >{startSong.id && endSong.id &&
                <Link
              href={{
                pathname: "/results",
                query: { startId: startSong.id, endId: endSong.id },
              }}
            >
                 <a>
                  Generate your <i>Vibesition</i>
                </a>
                </Link>}
              </button>
            
          </div>
          <SpotifySearch
            display={openTab == 0}
            color={startColor}
            setSong={setStartSong}
            title={"First Song"}
          />
          <SpotifySearch
            display={openTab == 1}
            color={endColor}
            setSong={setEndSong}
            title={"Second Song"}
          />
          <div className="m-10 flex flex-col rounded-2xl border-2 bg-slate-400 p-2">
            Hey, {session?.user?.name}
            <button className="hover:text-blue-200" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <Login />;
};

export default Home;
