import { Image } from '@imagekit/react';


const ImageComp = ({src, className, width="800", height="800", alt}) => {

    const urlEndpoint= import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT

    return (
        <Image 
        urlEndpoint={urlEndpoint}
        src={src} 
        className={className}
        loading="lazy"
        width={width}
        height={height}
        alt={alt}
        lqip={{active :true, quality:20}}
    
        />
    )
}

export default ImageComp;