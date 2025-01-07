"use client"

import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
} from "../../components/ui/carousel"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { SheepCard } from "./sheep-card"
import fetchStrapiAPI from "../../lib/strapi"

import { StrapiResponse, HomePageResponse } from "../../types/strapi"

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
  const [carousels, setCarousels] = useState<HomePageResponse['Carousels']>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStrapiAPI<HomePageResponse>('/home-page')
        setCarousels(response.data.Carousels)
      } catch (err) {
        setError('Failed to load carousel data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  if (loading) {
    return <div className="w-full text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="w-full text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {carousels.map((carousel) => (
            <div key={carousel.id} className="flex-[0_0_100%] min-w-0">
              <div className="p-4 space-y-8">
                {carousel.Content.map((content: {
                  type: string;
                  level?: number;
                  children: {
                    text: string;
                    type: string;
                  }[];
                }, index: number) => {
                  if (content.type === 'heading') {
                    return (
                      <div key={index} className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                          {content.children[0].text}
                        </h2>
                      </div>
                    )
                  }
                  if (content.type === 'paragraph' && content.children[0].text) {
                    return (
                      <p key={index} className="text-lg text-gray-300 text-center">
                        {content.children[0].text}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselDots 
        selectedIndex={selectedIndex} 
        itemCount={carousels.length} 
        onClick={scrollTo}
      />
    </div>
  )
}
