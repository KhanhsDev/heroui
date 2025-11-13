import { ICellRendererParams } from "ag-grid-community";
import { useState } from "react";

const SymbolCell = (params: ICellRendererParams) => {
  if (!params.data || !params.value) return <div />;

  const symbol = params.value;
  const [isSelected, setIsSelected] = useState(Math.random() > 0.5); // Mock selection state

  // Background color based on status
  const getBgClass = () => {
    switch (params.data?.status) {
      case "ceiling":
        return "bg-[var(--text-ceiling)]";
      case "floor":
        return "bg-[var(--text-floor)]";
      case "reference":
        return "bg-[var(--text-reference)]";
      case "up":
        return "bg-[var(--text-up-new)]";
      case "down":
        return "bg-[var(--text-down-new)]";
      default:
        return "bg-transparent";
    }
  };

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
  };

  // Text color - black for reference and floor, white for others
  const getTextColor = () => {
    return params.data?.status === "reference" ||
      params.data?.status === "floor"
      ? "#000000"
      : "#ffffff";
  };

  return (
    <div
      className={`flex items-center justify-center gap-[0.4rem] w-full h-full px-[0.8rem] py-[1rem] ${getBgClass()}`}
    >
      {/* Star icon - clickable */}
      <svg
        className="w-[2rem] h-[2rem] flex-shrink-0 cursor-pointer"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleToggleSelect}
      >
        <path
          d="M10 2.5L12.245 7.595L17.5 8.545L13.75 12.405L14.49 17.5L10 15.095L5.51 17.5L6.25 12.405L2.5 8.545L7.755 7.595L10 2.5Z"
          stroke={getTextColor()}
          strokeWidth="1.2"
          fill={isSelected ? getTextColor() : "none"}
        />
      </svg>

      {/* Symbol text - black for reference/floor, white for others */}
      <p
        className="text-[1.4rem] font-[600] leading-[1.3] m-0"
        style={{ color: getTextColor() }}
      >
        {symbol}
      </p>
    </div>
  );
};

export default SymbolCell;
