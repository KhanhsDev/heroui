export default function CheckBoxIcon() {
  return (
    <svg
      className="size-[2.4rem]"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 4.5V19.5C21.5 20.6046 20.6046 21.5 19.5 21.5H4.5C3.39543 21.5 2.5 20.6046 2.5 19.5V4.5C2.5 3.39543 3.39543 2.5 4.5 2.5H19.5C20.6046 2.5 21.5 3.39543 21.5 4.5Z"
        fill="url(#paint0_linear_checkbox)"
      />
      <path
        d="M8.5 12.5L11 15L16 9"
        stroke="var(--text-primary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_checkbox"
          x1="2.5"
          x2="2.5"
          y1="2.5"
          y2="21.5"
        >
          <stop stopColor="var(--brand-gradient-start)" />
          <stop offset="1" stopColor="var(--brand-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
