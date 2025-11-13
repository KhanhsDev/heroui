import { ICellRendererParams } from "ag-grid-community";

const OrderTypeCellRenderer = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const { orderType } = params.data;

  if (!orderType) return <div />;

  const isBuy = orderType.toLowerCase() === "buy" || orderType === "Mua";
  const textClass = isBuy
    ? "text-[var(--text-buy)]"
    : "text-[var(--text-sell)]";
  const label = isBuy ? "Mua" : "Bán";

  return (
    <div className="flex items-center justify-center w-full h-full bg-[var(--bg-primary)]">
      <p className={`${textClass} text-[1.4rem] font-[500] leading-[1.4]`}>
        {label}
      </p>
    </div>
  );
};

export default OrderTypeCellRenderer;
