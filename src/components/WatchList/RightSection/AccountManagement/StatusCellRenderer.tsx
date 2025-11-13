import { ICellRendererParams } from "ag-grid-community";

const StatusCellRenderer = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const { status } = params.data;

  if (!status) return <div />;

  // Text hiển thị cho từng trạng thái
  const getStatusText = () => {
    switch (status) {
      case "linked":
        return "Đang liên kết";
      case "unlinked":
        return "Hủy liên kết";
      default:
        return status;
    }
  };

  // Màu cho từng trạng thái - màu cam cho linked, xám cho unlinked
  const getStatusColor = () => {
    switch (status) {
      case "linked":
        return "text-[var(--text-warning)] bg-[var(--bg-warning-alpha)]";
      case "unlinked":
        return "text-[var(--text-tertiary)] bg-[var(--bg-unlinked-alpha)]";
      default:
        return "text-[var(--text-tertiary)] bg-[var(--bg-unlinked-alpha)]";
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <p
        className={`text-[1.4rem] font-[500] leading-[1.4] h-[3rem] flex justify-center items-center px-[1.2rem] rounded-[1.2rem] ${getStatusColor()}`}
      >
        {getStatusText()}
      </p>
    </div>
  );
};

export default StatusCellRenderer;
