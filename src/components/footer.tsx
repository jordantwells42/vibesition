/* eslint-disable @next/next/no-img-element */
export default function Footer(){
    return (
        <div className="w-full h-10 flex justify-between items-center p-5 bg-[#222] text-white text-base absolute bottom-0">
            <div className="flex w-full gap-4">
            <h1 >Made by <a className="underline" href="https://jordantwells.com">Jordan Wells</a></h1>
            <h1 className="flex">Powered by the <a href="https://spotify.com"><img className="w-5 mx-2 aspect-square object-contain" alt="Spotify Logo" src="/spotify.png" /></a> Spotify API</h1>
            </div>
        <a href="https://github.com/jordantwells42">
        <img
          className="h-8 brightness-200 invert"
          src="/github.png"
          
          aria-label="Follow @jordantwells42 on GitHub"
        />
        </a>
      </div>
    )
}