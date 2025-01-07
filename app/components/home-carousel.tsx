"use client"

import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
} from "../../components/ui/carousel"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { SheepCard } from "./sheep-card"

function CarouselDots({ selectedIndex, itemCount, onClick }: { 
  selectedIndex: number, 
  itemCount: number,
  onClick: (index: number) => void 
}) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: itemCount }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-colors ${
            index === selectedIndex ? "bg-indigo-500" : "bg-gray-500"
          }`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  )
}

export function HomeCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel()

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
    }
    return () => {
      if (emblaApi) emblaApi.destroy()
    }
  }, [emblaApi])

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index)
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {/* Slide 1 */}
          <div className="flex-[0_0_100%] min-w-0">
            <div className="p-4 space-y-8">
              <div className="grid grid-cols-3 gap-3">
                <SheepCard variant="blue" />
                <SheepCard variant="green" />
                <SheepCard variant="red" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Welcome to Mo</h1>
                <p className="text-lg text-gray-300">
                  We will ask you a few questions to personalize your experience.
                </p>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="flex-[0_0_100%] min-w-0">
            <div className="p-4 space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Dream Better</h2>
                <p className="text-lg text-gray-300">
                  Enhance your sleep quality with personalized meditation and relaxation techniques.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🌙</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="flex-[0_0_100%] min-w-0">
            <div className="p-4 space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Track Progress</h2>
                <p className="text-lg text-gray-300">
                  Monitor your sleep patterns and see improvements over time.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-5xl">📈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CarouselDots 
        selectedIndex={selectedIndex} 
        itemCount={3} 
        onClick={scrollTo}
      />
    </div>
  )
}
