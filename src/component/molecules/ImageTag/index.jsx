import React from 'react'
import { Assets } from '../../../assets/Assets'

const ImageTag = ({ src, alt, height }) => {
    return (
        <img src={src ? src : Assets.water_mark.img} alt={alt ? alt : Assets.water_mark.alt} style={{ height: src ? null : height }} />
    )
}

export default ImageTag