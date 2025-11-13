import { ICellRendererParams } from "ag-grid-community";

const PriceChangeCell = (params: ICellRendererParams) => {
  if (!params.data || params.value == null) return <div />;

  const change = params.value;
  const changePercent = ((Math.random() - 0.5) * 2).toFixed(1); // Mock percent -1% to 1%

  const sign = change > 0 ? "+" : "";
  const changeText = `${sign}${change.toFixed(1)}`;
  const percentText = `${sign}${changePercent}%`;

  // Determine color
  const getColorClass = () => {
    if (change > 0) return "text-[var(--text-up-new)]";
    if (change < 0) return "text-[var(--text-down-new)]";
    return "text-[var(--text-reference)]";
  };

  return (
    <div className="flex flex-col items-end justify-center w-full h-full px-[0.8rem] py-[1rem]">
      <p
        className={`text-[1.4rem] font-[500] leading-[1.4] m-0 ${getColorClass()}`}
      >
        {changeText}
      </p>
      <p
        className={`text-[1.4rem] font-[500] leading-[1.4] m-0 ${getColorClass()}`}
      >
        {percentText}
      </p>
    </div>
  );
};

export default PriceChangeCell;
