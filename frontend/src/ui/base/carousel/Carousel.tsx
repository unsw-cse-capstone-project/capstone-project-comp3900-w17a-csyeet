import * as React from "react";
import Slider from "react-slick";

/**
 * Carousel component for images
 * @param images
 * @param imageClass
 */
export const Carousel = ({
  images,
  imageClass,
}: {
  images: string[];
  imageClass?: string;
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((image, i) => (
        <img
          className={imageClass}
          src={image}
          key={i}
          alt={`Property view ${i}`}
        />
      ))}
    </Slider>
  );
};
