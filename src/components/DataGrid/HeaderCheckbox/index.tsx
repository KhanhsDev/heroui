import React, { useState, useEffect } from "react";
import CheckBoxIcon from "@/svg/CheckBoxIcon";
import UnCheckBoxIcon from "@/svg/UnCheckBoxIcon";
import IndeterminateCheckBoxIcon from "@/svg/IndeterminateCheckBoxIcon";
import type { IHeaderParams } from "ag-grid-community";

const HeaderCheckbox = (props: IHeaderParams) => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const updateCheckboxState = () => {
    const selectedCount = props.api.getSelectedNodes().length;
    const selectableRows = [];
    props.api.forEachNode((node) => {
      if (node.selectable) {
        selectableRows.push(node);
      }
    });

    if (selectedCount === 0) {
      setChecked(false);
      setIndeterminate(false);
    } else if (selectedCount === selectableRows.length) {
      setChecked(true);
      setIndeterminate(false);
    } else {
      setChecked(false);
      setIndeterminate(true);
    }
  };

  useEffect(() => {
    props.api.addEventListener("selectionChanged", updateCheckboxState);
    updateCheckboxState();
    return () => {
      props.api.removeEventListener("selectionChanged", updateCheckboxState);
    };
  }, [props.api, updateCheckboxState]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (checked) {
      props.api.deselectAll();
    } else {
      props.api.selectAll();
    }
    props.api.refreshCells({
      force: true,
      columns: [props.column.getColId()],
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      {checked ? (
        <CheckBoxIcon />
      ) : indeterminate ? (
        <IndeterminateCheckBoxIcon />
      ) : (
        <UnCheckBoxIcon />
      )}
    </div>
  );
};

export default HeaderCheckbox;
