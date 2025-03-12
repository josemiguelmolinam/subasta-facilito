
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ alt, ...props }, ref) => {
    return <img ref={ref} alt={alt} {...props} />;
  }
);

Image.displayName = "Image";

export default Image;
