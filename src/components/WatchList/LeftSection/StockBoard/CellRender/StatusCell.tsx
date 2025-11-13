import { ICellRendererParams } from "ag-grid-community";

const StatusCell = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  // Mock data for T/TC/S (Trần/Tham chiếu/Sàn counts)
  const ceiling = Math.floor(Math.random() * 100);
  const reference = Math.floor(Math.random() * 100);
  const floor = Math.floor(Math.random() * 100);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-[0.8rem] py-[1rem]">
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

export default StatusCell;
