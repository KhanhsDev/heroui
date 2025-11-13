import { ICellRendererParams } from "ag-grid-community";

const StatusCellRenderer = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const { status } = params.data;

  if (!status) return <div />;

  // Determine status type and styling
  const statusConfig: Record<
    string,
    { label: string; bgClass: string; textClass: string }
  > = {
    matched: {
      label: "Khớp toàn bộ",
      bgClass: "bg-[var(--bg-success-alpha)]",
      textClass: "text-[var(--bg-success)]",
    },
    partial: {
      label: "Khớp một phần",
      bgClass: "bg-[var(--bg-warning-alpha)]",
      textClass: "text-[var(--text-warning)]",
    },
    pending: {
      label: "Chờ khớp",
      bgClass: "bg-[var(--bg-warning-alpha)]",
      textClass: "text-[var(--text-warning)]",
    },
    cancelled: {
      label: "Đã huỷ",
      bgClass: "bg-[var(--bg-danger-alpha)]",
      textClass: "text-[var(--text-danger)]",
    },
  };

  const config = statusConfig[status] || statusConfig["pending"];

  return (
    <div className="flex items-center justify-center w-full h-full bg-[var(--bg-primary)]">
      <div
        className={`${config.bgClass} rounded-[1.2rem] px-[1.2rem] py-[0.4rem]`}
      >
        <p
          className={`${config.textClass} text-[1.3rem] font-[600] leading-[1.4]`}
        >
          {config.label}
        </p>
      </div>
    </div>
  );
};

export default StatusCellRenderer;
