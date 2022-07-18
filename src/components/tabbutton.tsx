import textColor from '../libs/textColor';
import tinycolor from 'tinycolor2';
/* eslint-disable @next/next/no-img-element */
export default function TabButton ({
  tabNumber,
  setOpenTab,
  display,
  song,
  color,
  children
}: {
  tabNumber: number
  setOpenTab: (tabNumber: number) => void
  display: boolean
  song: any
  color: tinycolor.Instance
  children: JSX.Element
}) {
  return (<button
    className={"w-1/3 h-20 flex flex-row items-center justify-center p-2 " + (tabNumber === 0? "rounded-tl-xl" : "")}
    style={{backgroundColor: color.toHexString(), color: textColor(color, [tinycolor("white")])}}
    onClick={() => setOpenTab(tabNumber)}
  >
    {song.img && (
      <img
        className='h-3/4 aspect-square mx-5 rounded hidden md:block'
        alt={song.name}
        src={song.img}
      />
    )}
    {children}
  </button>)
}
