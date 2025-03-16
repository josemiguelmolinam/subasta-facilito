
import React from "react";
import { Trophy } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "@/components/ui/image";

interface ImageCarouselProps {
  images: string[];
  isSold?: boolean;
  title: string;
}

export const ImageCarousel = ({ images, isSold, title }: ImageCarouselProps) => {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1 h-[300px] sm:h-[400px] md:h-[500px]">
                <Image 
                  src={image} 
                  alt={`${title} image ${index + 1}`} 
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
      {isSold && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[2px]"></div>
          <div className="relative transform -rotate-12 animate-fade-in">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-3xl md:text-5xl font-bold py-4 px-8 rounded-lg shadow-xl border-2 border-white">
                VENDIDO
              </div>
              <Trophy className="h-16 w-16 text-yellow-400 mt-4 animate-bounce" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
