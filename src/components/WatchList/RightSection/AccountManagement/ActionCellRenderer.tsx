import { ICellRendererParams } from "ag-grid-community";

const ActionCellRenderer = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const { status } = params.data;

  if (!status) return <div />;

  const handleClick = () => {
    console.log("Action clicked for:", params.data);
  };

  const isLinked = status === "linked";

  if (isLinked) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <button
          onClick={handleClick}
          className="cursor-pointer px-[1.2rem] h-[3rem] rounded-[1.2rem] bg-[#FF2F2F] text-[var(--text-secondary)] text-[1.3rem] font-[600] leading-[1.4]"
        >
          Hủy liên kết
        </button>
      </div>
    );
  }

  return <div />;
};

export default ActionCellRenderer;
