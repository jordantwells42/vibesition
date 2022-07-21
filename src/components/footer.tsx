/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <div className="absolute bottom-0 flex h-10 w-full items-center justify-between bg-[#222] p-5 text-white text-xs md:text-base">
      <div className="flex w-full gap-4">
        <h1>
          Made by{" "}
          <a className="underline" href="https://jordantwells.com">
            Jordan Wells
          </a>
        </h1>
        <h1 className="flex">
          Powered by the{" "}
          <a className="flex" href="https://spotify.com">
            <img
              className="mx-2 aspect-square w-5 object-contain"
              alt="Spotify Logo"
              src="/spotify.png"
            />
          {" "}
          Spotify API
          </a>
        </h1>
      </div>
      <a href="https://github.com/jordantwells42">
        <img
          className="h-8 brightness-200 invert"
          src="/github.png"
          aria-label="Follow @jordantwells42 on GitHub"
        />
      </a>
    </div>
  );
}
