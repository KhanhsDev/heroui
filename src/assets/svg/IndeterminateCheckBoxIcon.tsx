export default function IndeterminateCheckBoxIcon() {
  return (
    <svg
      className="size-[4.4rem]"
      fill="none"
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dd_indeterminate)">
        <rect fill="#101010" height="24" rx="8" width="24" x="10" y="10" />
        <rect
          height="23"
          rx="7.5"
          stroke="#222222"
          width="23"
          x="10.5"
          y="10.5"
        />
        <rect fill="#DADADA" height="2" rx="1" width="10" x="17" y="21" />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="44"
          id="filter0_dd_indeterminate"
          width="44"
          x="0"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="-5" dy="-5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_indeterminate"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="5" dy="5" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            in2="effect1_dropShadow_indeterminate"
            mode="normal"
            result="effect2_dropShadow_indeterminate"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_indeterminate"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
