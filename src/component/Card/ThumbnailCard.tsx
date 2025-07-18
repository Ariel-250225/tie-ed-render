import { Card, CardFooter, Image, Button } from "@heroui/react";

export function ThumbnailCard(props: { width: number; height: number }) {
  const { width, height } = props;
  return (
    <Card isFooterBlurred className="border-none flex-shrink-0" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={width}
        src="https://heroui.com/images/hero-card.jpeg"
        width={height}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Available soon.</p>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>
  );
}
