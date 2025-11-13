export default function BackgroundGradient() {
  return (
    <div className="absolute inset-[47.04%_-18.5%_-86.89%_33.02%] flex items-center justify-center pointer-events-none">
      <div className="w-[146.9rem] h-[78rem] rotate-[322.717deg] scale-y-[-1] opacity-40">
        <svg
          className="w-full h-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1736 1047"
        >
          <g filter="url(#filter0_f)" opacity="0.4">
            <path
              d="M761.478 202.205C1205.73 36.4515 1416.96 195.299 1602.2 404.226C1448.91 569.81 1347.5 670.858 1297.95 707.37C1204.53 776.247 1102.61 828.396 977.267 858.486C713.754 931.958 386.17 935.393 133.2 844.556L761.478 202.205Z"
              fill="url(#gradient0)"
              fillOpacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f"
              x="0"
              y="0"
              width="1735.4"
              height="1046.4"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="66.6"
                result="effect1_foregroundBlur"
              />
            </filter>
            <linearGradient
              id="gradient0"
              x1="1331.55"
              y1="-202.546"
              x2="951.507"
              y2="477.745"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2B7E2D" />
              <stop offset="1" stopColor="#429744" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
