import { ICellRendererParams } from 'ag-grid-community';
import EditIcon from '@/assets/svg/EditIcon';
import TrashIcon from '@/assets/svg/TrashIcon';

const ActionsCellRenderer = (params: ICellRendererParams) => {
  if (!params.data) return <div />;

  const handleEdit = () => {
    console.log('Edit order:', params.data);
    // TODO: Implement edit functionality
  };

  const handleDelete = () => {
    console.log('Delete order:', params.data);
    // TODO: Implement delete functionality
  };

  return (
    <div className="flex items-center justify-center gap-[0.8rem] w-full h-full bg-[var(--bg-primary)]">
      <button
        className="flex items-center justify-center cursor-pointer"
        onClick={handleEdit}
        aria-label="Edit order"
      >
        <EditIcon />
      </button>
      <button
        className="flex items-center justify-center cursor-pointer"
        onClick={handleDelete}
        aria-label="Delete order"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default ActionsCellRenderer;
