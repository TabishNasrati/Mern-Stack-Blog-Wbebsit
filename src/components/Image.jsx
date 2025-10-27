import { Image } from '@imagekit/react';

const ImageComp = ({src, className, width, height, alt}) => {

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
        transformation={[{ width: 500, height: 500 }]}
        lqip={{active :true, quality:20}}
        />
    )
}

export default ImageComp;