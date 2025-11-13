import { ICellRendererParams } from "ag-grid-community";

const DeleteCellRenderer = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const handleDelete = () => {
    // Call the delete handler passed through context
    if (params.context?.onDeleteClick) {
      params.context.onDeleteClick(params.data.id);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <button
        onClick={handleDelete}
        className="w-[2.4rem] h-[2.4rem] flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <svg
          className="w-[2.4rem] h-[2.4rem]"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            stroke="var(--icon-secondary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
};

export default DeleteCellRenderer;
