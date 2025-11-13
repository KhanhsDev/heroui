import { ICellRendererParams } from "ag-grid-community";

const CeilingRefFloorCell = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const ceiling = params.data.ceiling?.toFixed(2) || "-";
  const reference = params.data.reference?.toFixed(2) || "-";
  const floor = params.data.floor?.toFixed(2) || "-";

  return (
    <div className="flex flex-col items-end justify-center w-full h-full px-[0.8rem] py-[1rem]">
      <p className="text-[1.4rem] font-[500] leading-[1.4] m-0 text-[var(--text-ceiling)]">
        {ceiling}
      </p>
      <p className="text-[1.4rem] font-[500] leading-[1.4] m-0 text-[var(--text-reference)]">
        {reference}
      </p>
      <p className="text-[1.4rem] font-[500] leading-[1.4] m-0 text-[var(--text-floor)]">
        {floor}
      </p>
    </div>
  );
};

export default CeilingRefFloorCell;
