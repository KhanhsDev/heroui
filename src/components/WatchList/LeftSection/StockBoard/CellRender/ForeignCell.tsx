import { ICellRendererParams } from "ag-grid-community";

const ForeignCell = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const buyValue = params.data.foreignBuy
    ? (params.data.foreignBuy / 1000).toFixed(2)
    : "-";
  const sellValue = params.data.foreignSell
    ? (params.data.foreignSell / 1000).toFixed(2)
    : "-";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-[0.8rem] py-[1rem]">
      <p className="text-[1.4rem] font-[500] leading-[1.4] m-0 text-[var(--text-up-new)]">
        {buyValue}
      </p>
      <p className="text-[1.4rem] font-[500] leading-[1.4] m-0 text-[var(--text-down-new)]">
        {sellValue}
      </p>
    </div>
  );
};

export default ForeignCell;
