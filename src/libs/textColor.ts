import tinycolor from "tinycolor2"

export default function textColor(color:tinycolor.Instance, colors: tinycolor.Instance[]){
    return tinycolor.mostReadable(color, colors, {includeFallbackColors:true}).toHexString()
}