'use client';
import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import IndexItem from './IndexItem';
import ChevronRightIcon from '@/assets/svg/ChevronRightIcon';
import ChevronLeftIcon from '@/assets/svg/ChevronLeftIcon';

const IndexInfo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 5.5, // Hiển thị 3 phần tử ban đầu
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const handleNext = () => {
    instanceRef.current?.next();
  };

  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  // Check if at the beginning or end
  const isAtStart = currentSlide === 0;
  const isAtEnd = instanceRef.current
    ? currentSlide >= instanceRef.current.track.details.slides.length - 5.5
    : false;

  return (
    <div className="w-full overflow-hidden relative">
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="keen-slider__slide">
            <IndexItem />
          </div>
        ))}
      </div>

      {/* Previous Button with Gradient Overlay */}
      {!isAtStart && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 h-full w-[6rem] bg-gradient-to-r from-[var(--bg-primary)] from-[23.438%] via-[rgba(17,19,19,0.8)] via-[72.656%] to-transparent to-[121.87%] flex items-center justify-center cursor-pointer border-none outline-none"
          aria-label="Previous slide"
        >
          <div className="w-[2.4rem] h-[2.4rem] text-[var(--text-primary)]">
            <ChevronLeftIcon />
          </div>
        </button>
      )}

      {/* Next Button with Gradient Overlay */}
      {!isAtEnd && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 h-full w-[6rem] bg-gradient-to-l from-[var(--bg-primary)] from-[23.438%] via-[rgba(17,19,19,0.8)] via-[72.656%] to-transparent to-[121.87%] flex items-center justify-center cursor-pointer border-none outline-none"
          aria-label="Next slide"
        >
          <div className="w-[2.4rem] h-[2.4rem] text-[var(--text-primary)]">
            <ChevronRightIcon />
          </div>
        </button>
      )}
    </div>
  );
};

export default IndexInfo;
