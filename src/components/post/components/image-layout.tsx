import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Props {
    images: string[];
}
const ImageLayout: React.FC<Props> = ({ images }) => {
    const handleRenderImages = () => {
        if (images.length === 1)
            return images.map((image, index) => <img alt="" className="max-h-80" key={index} src={image} />);
        return (
            <Carousel
                opts={{
                    dragFree: true,
                }}
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem className="basis-auto" key={index}>
                            <img alt="" className="h-80" src={image} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        );
    };

    return <div>{handleRenderImages()}</div>;
};
export default ImageLayout;
