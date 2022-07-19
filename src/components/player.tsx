import ReactAudioPlayer from 'react-audio-player';
export default function Player({src}:{src: string}){
    return (
        <ReactAudioPlayer
        className='w-full h-10 hidden md:block'
        src={src}
        controls
        // other props here
      />
    )
}