/* eslint-disable @next/next/no-img-element */
export default function SongImage({
  songName,
  imgUrl,
  spotifyUrl,
}: {
  songName: string;
  imgUrl: string;
  spotifyUrl: string;
}) {
  return (
    <div className="flex aspect-square w-full flex-row items-center justify-center rounded-lg">
      <a className="flex-col backdrop-brightness-90 h-full hover:text-green-200 justify-center items-center" href={spotifyUrl}>
        <img className="w-5 m-1 aspect-square object-contain origin-center" alt="Spotify Logo" src="/spotify.png" />
        <h2 style={{writingMode:"vertical-rl"}} className="text-center origin-center">Listen</h2>
      </a>
      <img className="object-contain w-5/6 aspect-square" alt={songName} src={imgUrl}></img>
    </div>
  );
}
