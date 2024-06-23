import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { usePostContext } from "../../post-context";

interface Props {}
const PostImages: React.FC<Props> = () => {
    const { value, handleRemoveMedia: handleRemoveImage } = usePostContext();
    const currentLengthRef = useRef<number>(value.media.length);
    const [imagesURL, setImagesURL] = useState(value.media.map((image) => URL.createObjectURL(image)));

    const handleRemove = (index: number) => {
        handleRemoveImage(index);
        const newImagesURL = [...imagesURL];
        newImagesURL.splice(index, 1);
        setImagesURL(newImagesURL);
        currentLengthRef.current = newImagesURL.length;
    };

    useEffect(() => {
        if (value.media.length !== currentLengthRef.current) {
            const difference = value.media.length - currentLengthRef.current;
            //* only gen new URL for new images
            const newImagesURL = value.media.slice(-difference).map((image) => URL.createObjectURL(image));
            setImagesURL([...imagesURL, ...newImagesURL]);
            currentLengthRef.current = value.media.length;
        }
    }, [value.media]);

    return (
        <Carousel
            opts={{
                dragFree: true,
            }}
        >
            <CarouselContent>
                {imagesURL.map((image, index) => (
                    <CarouselItem className="relative basis-auto" key={index}>
                        <Button
                            className="absolute right-2 top-2 size-7"
                            size="icon"
                            variant="secondary"
                            onClick={handleRemove.bind(null, index)}
                        >
                            <X size={16} />
                        </Button>
                        <img alt="post" className="h-56 rounded-md" src={image} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};
export default PostImages;
