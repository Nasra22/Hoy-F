"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PropertyImage } from "@/lib/property-service"

interface PropertyGalleryProps {
  images: PropertyImage[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
        <Image
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          fill
          className="object-cover"
          priority
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full h-10 w-10"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous image</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full h-10 w-10"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>

      <div className="flex mt-2 gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden cursor-pointer transition-all ${
              index === currentIndex ? "ring-2 ring-primary" : "opacity-70"
            }`}
            onClick={() => goToImage(index)}
          >
            <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
