import tinycolor from 'tinycolor2';
export default function featuresToColors(features: any){
    if (!features || !features.danceability){ return tinycolor('slategray') }
    return tinycolor({
        r: features.danceability * 255,
        g: features.valence * 255,
        b: features.energy * 255
      })
    
}