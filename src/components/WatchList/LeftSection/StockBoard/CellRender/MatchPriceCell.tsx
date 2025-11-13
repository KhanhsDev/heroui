import { ICellRendererParams } from "ag-grid-community";

const MatchPriceCell = (params: ICellRendererParams) => {
  if (!params.data || params.value == null) return <div />;

  const price = params.value.toFixed(2);
  const volume = (100 + Math.random() * 500).toFixed(2); // Mock volume

  // Determine text color based on status
  const getColorClass = () => {
    if (!params.data?.status) return "text-[var(--text-primary)]";

    switch (params.data.status) {
      case "ceiling":
        return "text-[var(--text-ceiling)]";
      case "floor":
        return "text-[var(--text-floor)]";
      case "reference":
        return "text-[var(--text-reference)]";
      case "up":
        return "text-[var(--text-up-new)]";
      case "down":
        return "text-[var(--text-down-new)]";
      default:
        return "text-[var(--text-primary)]";
    }
  };

  return (
    <div className="flex flex-col items-end justify-center w-full h-full px-[0.8rem] py-[1rem]">
      <p
        className={`text-[1.4rem] font-[500] leading-[1.4] m-0 ${getColorClass()}`}
      >
        {price}
      </p>
      <p
        className={`text-[1.4rem] font-[500] leading-[1.4] m-0 ${getColorClass()}`}
      >
        {volume}
      </p>
    </div>
  );
};

export default MatchPriceCell;
