import React, { useRef } from "react";
import { ColDef, IHeaderParams } from "ag-grid-community";
import CaretLeft from "assets/svg/caret_left.svg";
import CaretRight from "assets/svg/caret_right.svg";

interface ToggleHeaderProps extends IHeaderParams {
  hideCaretLeft?: boolean;
  hideCaretRight?: boolean;
  customGroupToggle?: string[][];
}

const ToggleHeader = (props: ToggleHeaderProps) => {
  const localSortState = useRef<string | null>();

  const handleToggle = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.customGroupToggle) {
      const states = props.api
        .getColumnState()
        .filter(
          (state) =>
            props.customGroupToggle?.[0]?.includes(state.colId) ||
            props.customGroupToggle?.[1]?.includes(state.colId)
        );
      props.api.applyColumnState({
        state: states.map((item) => ({ ...item, hide: !item.hide })),
      });
    } else {
      const parent = props.column.getParent();
      const columnGroupStates = props.api.getColumnGroupState();
      const columnGroupState = columnGroupStates.find(
        (item) => item.groupId === parent?.getProvidedColumnGroup().getGroupId()
      );
      if (columnGroupState && parent) {
        props.api.setColumnGroupOpened(
          parent.getProvidedColumnGroup(),
          !columnGroupState.open
        );

        props.api.refreshHeader();
        setTimeout(() => {
          props.api.sizeColumnsToFit();
        }, 200);
      }
    }
  };

  const handleSort = () => {
    props.progressSort();
    props.api.refreshHeader();
  };

  const sortable = (props.column.getDefinition() as ColDef).sortable;

  const columnState = props.api
    .getColumnState()
    .find((item) => item.colId === props.column.getUniqueId());
  localSortState.current = columnState?.sort;
  return (
    <button
      type="button"
      className={`toggle-header w-full items-center flex justify-between px-[0.6rem] ${
        sortable === true ? "cursor-ns-resize" : ""
      }`}
      {...(sortable === true && { onClick: handleSort })}
    >
      <div>
        {!props.hideCaretLeft && (
          <CaretLeft
            width={10}
            height={10}
            className="cursor-pointer  h-[1.4rem]"
            onClick={handleToggle}
            onTouchStart={handleToggle}
          />
        )}
      </div>
      {props.displayName}
      {localSortState.current != null && (
        <div
          className={`ag-icon !text-[1.4rem] ${
            localSortState.current === "asc" ? "ag-icon-asc" : "ag-icon-desc"
          }`}
        />
      )}
      <div>
        {!props.hideCaretRight && (
          <CaretRight
            width={10}
            height={10}
            className="cursor-pointer h-[1.4rem]"
            onClick={handleToggle}
            onTouchStart={handleToggle}
          />
        )}
      </div>
    </button>
  );
};

export default ToggleHeader;
