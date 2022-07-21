import ReactAudioPlayer from 'react-audio-player';
export default function Player({src}:{src: string}){
  return (<></>)  
  return (
        <ReactAudioPlayer
        className='w-1/2 h-10 hidden md:block'
        src={src}
        controls
        // other props here
      />
    )
}