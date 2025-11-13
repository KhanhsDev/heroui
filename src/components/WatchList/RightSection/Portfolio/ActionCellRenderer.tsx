import { ICellRendererParams } from "ag-grid-community";

const ActionCellRenderer = (params: ICellRendererParams) => {
  // Always check params.data first
  if (!params.data) return <div />;

  const { action } = params.data;

  // Early return for empty data
  if (!action) return <div />;

  const isBuy = action === "buy";
  const label = isBuy ? "Mua" : "Bán";
  const textColor = isBuy ? "var(--text-buy)" : "var(--text-sell)";
  const bgColor = isBuy ? "var(--bg-buy-alpha)" : "var(--bg-sell-alpha)";

  return (
    <div className="flex items-center justify-center w-[5.2rem] h-full">
      <div
        className="rounded-[0.8rem] p-[0.4rem] flex items-center justify-center w-full cursor-pointer"
        style={{ backgroundColor: bgColor }}
      >
        <p
          className="text-[1.4rem] font-[500] leading-[1.4]"
          style={{ color: textColor }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

export default ActionCellRenderer;
