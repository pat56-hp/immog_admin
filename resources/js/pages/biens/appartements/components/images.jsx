import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AppartementImages({ appartement }) {
    const [images] = useState(() => {
        const image = JSON.parse(appartement.photos);
        return image && image.length > 0 ? image : ["/images/appart.png"];
    });
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                    Galerie de photos de l'appartement
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <div className="h-80 overflow-hidden rounded-lg">
                        <div className="relative aspect-video">
                            <img
                                src={images[currentImage] || "/placeholder.svg"}
                                alt={`Appartement vue ${currentImage + 1}`}
                                className="object-cover transition-transform duration-500 w-full"
                            />
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={() =>
                            setCurrentImage((prev) =>
                                prev === 0 ? images.length - 1 : prev - 1
                            )
                        }
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={() =>
                            setCurrentImage((prev) =>
                                prev === images.length - 1 ? 0 : prev + 1
                            )
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                    index === currentImage
                                        ? "bg-primary"
                                        : "bg-primary/30"
                                }`}
                                onClick={() => setCurrentImage(index)}
                                aria-label={`Voir image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`relative aspect-video overflow-hidden rounded-md border-2 ${
                                index === currentImage
                                    ? "border-primary"
                                    : "border-transparent"
                            }`}
                            onClick={() => setCurrentImage(index)}
                        >
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`Miniature ${index + 1}`}
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
