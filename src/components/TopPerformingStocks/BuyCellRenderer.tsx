import { ICellRendererParams } from "ag-grid-community";

const BuyCellRenderer = (params: ICellRendererParams) => {
  // Kiểm tra params.data trước khi destructure
  if (!params.data) return null;

  const { buyRange, buyTime } = params.data;

  // Nếu không có dữ liệu mua, không hiển thị gì
  if (!buyRange) return null;

  return (
    <div className="flex flex-col gap-[0.4rem] items-center justify-center w-full h-full bg-[var(--bg-buy)]">
      <p className="text-[var(--text-secondary)] text-[1.5rem] font-[600] leading-[1.4]">
        {buyRange}
      </p>
      <p className="text-[var(--text-secondary)] text-[1.2rem] font-[400] leading-[1.3]">
        {buyTime}
      </p>
    </div>
  );
};

export default BuyCellRenderer;
