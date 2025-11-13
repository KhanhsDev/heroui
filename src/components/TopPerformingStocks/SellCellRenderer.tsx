import { ICellRendererParams } from "ag-grid-community";

const SellCellRenderer = (params: ICellRendererParams) => {
  // Kiểm tra params.data trước khi destructure
  if (!params.data) return null;

  const { sellRange, sellTime } = params.data;

  // Nếu không có dữ liệu bán, không hiển thị gì
  if (!sellRange) return null;

  return (
    <div className="flex flex-col gap-[0.4rem] items-center justify-center w-full h-full bg-[var(--bg-sell)]">
      <p className="text-[var(--text-primary)] text-[1.5rem] font-[600] leading-[1.4]">
        {sellRange}
      </p>
      <p className="text-[var(--text-primary)] text-[1.2rem] font-[400] leading-[1.3]">
        {sellTime}
      </p>
    </div>
  );
};

export default SellCellRenderer;
