import React from 'react';
import CheckBoxIcon from '@/assets/svg/CheckBoxIcon';
import UnCheckBoxIcon from '@/assets/svg/UnCheckBoxIcon';
import type { ICellRendererParams } from 'ag-grid-community';

const CheckBoxCell = ({
  node,
  refreshCell,
  api,
  column,
}: ICellRendererParams) => {
  const handleOnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    node.setSelected(!node.isSelected());
    const id = column?.getId();
    if (id) {
      api.refreshCells({ columns: [id], force: true, suppressFlash: true });
    }
  };

  if (!node.selectable) {
    return null;
  }

  return (
    <div className="cursor-pointer" onClick={handleOnClick}>
      {!node.isSelected() ? <UnCheckBoxIcon /> : <CheckBoxIcon />}
    </div>
  );
};

export default CheckBoxCell;
