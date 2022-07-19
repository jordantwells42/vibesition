/* eslint-disable @next/next/no-img-element */
export default function Footer(){
    return (
        <div className="w-full h-10 flex justify-between items-center p-5 bg-[#222] text-white text-base absolute bottom-0">
            <h1>Made by <a className="underline" href="https://jordantwells.com">Jordan Wells</a></h1>
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