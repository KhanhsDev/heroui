import { IHeaderParams } from "ag-grid-community";

const CancelAllHeaderRenderer = (params: IHeaderParams) => {
  const handleCancelAll = () => {
    console.log("Cancel all orders");
    // TODO: Implement cancel all functionality
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-[0.8rem] py-[1rem]">
      <button
        onClick={handleCancelAll}
        className="bg-[var(--bg-danger-alpha)] rounded-[1.2rem] px-[1.2rem] py-[0.4rem] cursor-pointer hover:opacity-80 transition-opacity"
      >
        <p className="text-[var(--text-danger)] text-[1.3rem] font-[600] leading-[1.4] whitespace-nowrap">
          Huỷ toàn bộ
        </p>
      </button>
    </div>
  );
};

export default CancelAllHeaderRenderer;
