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
import Footer from "../components/footer";

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
      <div className="relative flex font-main min-h-screen w-full flex-col items-center justify-start overflow-x-hidden  bg-green-50 text-stone-900">
        <div className="flex h-full w-5/6 flex-col items-center justify-center py-5 lg:w-3/4">
          <div className="m-5 flex flex-row items-center justify-center ">
            <Link href="/">
              <a>
                <img src="/logo.svg" className="w-10 mx-3" />
              </a>
            </Link>
            <h1 className="text-4xl font-semibold">
              <b>
                <i>Vibesition</i>
              </b>
            </h1>
          </div>
          <div className=""></div>
          <h2 className="text-center text-2xl m-1">
            Create a seamless transition from one song&apos;s <i>vibe</i> to
            another
          </h2>
          <div className=""></div>
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

            <Link
                  href={{
                    pathname: (startSong.id && endSong.id) ? "/results" : "/",
                    query: { startId: startSong.id, endId: endSong.id },
                  }}
                >
            <button
              style={{
                backgroundColor:
                  startSong.id && endSong.id
                    ? tinycolor("#1ed760").desaturate(20).toHexString()
                    : tinycolor("#1ed760").desaturate(40).toHexString(),
              }}
              className={`flex h-20 w-1/3 flex-row items-center justify-center rounded-t-2xl p-2 font-bold md:text-xl text-white border-green-100 border-l-2 border-t-2`}
              onClick={() => setOpenTab(0)}
            >
              {startSong.id && endSong.id && (

                  <a>
                    Generate your <i>Vibesition</i>
                  </a>
                
              )}
            </button>
            </Link>
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
          <div
            className={
              "m-10 flex w-3/4 flex-col rounded-2xl p-4 text-center text-xl text-white md:w-1/3"
            }
            style={{
              backgroundColor: tinycolor("#1ed760")
                .desaturate(40)
                .toHexString(),
            }}
          >
            Hey, {session?.user?.name}
            <button className="hover:text-blue-200" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return <Login />;
};

export default Home;
