import { ICellRendererParams } from "ag-grid-community";

const StatusCellRenderer = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const { status } = params.data;

  if (status === "active") {
    return (
      <div className="flex items-center justify-start h-full w-full px-[1.6rem]">
        <div className="bg-[var(--bg-success-alpha)] rounded-[1.2rem] px-[1.2rem] py-[0.4rem] h-[3rem] flex items-center justify-center">
          <p className="text-[1.3rem] font-[600] leading-[1.4] text-[var(--bg-success)]">
            Đang áp dụng
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-start h-full w-full px-[1.6rem]">
      <div className="bg-[rgba(111,123,123,0.1)] rounded-[1.2rem] px-[1.2rem] py-[0.4rem] h-[3rem] flex items-center justify-center">
        <p className="text-[1.3rem] font-[600] leading-[1.4] text-[#6f7b7b]">
          Chưa áp dụng
        </p>
      </div>
    </div>
  );
};

export default StatusCellRenderer;
