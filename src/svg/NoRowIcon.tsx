export default function NoRowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "size-[2.5rem]"}
      fill="none"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M22.5 15V19C22.5 20.1046 21.6046 21 20.5 21H4.5C3.39543 21 2.5 20.1046 2.5 19L2.5 15H6.77924L7.32339 16.6325C7.59562 17.4491 8.3599 18 9.22076 18H15.882C16.6395 18 17.332 17.572 17.6708 16.8944L18.618 15L22.5 15Z"
        fill="var(--icon-secondary)"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M3.0625 13L6.42654 7.01948C6.78078 6.38972 7.44715 6 8.16969 6L16.8303 6C17.5529 6 18.2192 6.38972 18.5735 7.01948L21.9375 13H18.618C17.8605 13 17.168 13.428 16.8292 14.1056L15.882 16H9.22076L8.67661 14.3675C8.40438 13.5509 7.6401 13 6.77924 13H3.0625Z"
        fill="var(--icon-secondary)"
        fillRule="evenodd"
        opacity="0.3"
      />
    </svg>
  );
}
