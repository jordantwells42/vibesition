/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <div className="absolute bottom-0 flex h-16 gap-4 w-full items-center justify-between bg-[#222] p-5 text-white text-xs md:text-base">
      <div className="flex items-center justify-center gap-4">
        <h1>
          Made by{" "}
          <a className="underline" href="https://jordantwells.com">
            Jordan Wells
          </a>
        </h1>
        <a href="https://ko-fi.com/jordantwells" rel="noreferrer noopener" target="_blank">
        <img
          className="h-14 w-full object-contain"
          src="/kofi.png"
          aria-label="Support me on Ko-Fi!"
        />
      </a>
      </div>
      <a href="https://github.com/jordantwells42">
        <img
          className="w-8 brightness-200 invert"
          src="/github.png"
          aria-label="Follow @jordantwells42 on GitHub"
        />
      </a>
    </div>
  );
}
