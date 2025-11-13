"use client";
import {
  ColDef,
  Column,
  ColumnGroup,
  IHeaderGroupParams,
} from "ag-grid-community";
import React, { useRef } from "react";
import CaretLeft from "assets/svg/caret_left.svg";
import CaretRight from "assets/svg/caret_right.svg";

interface ToggleGroupHeaderProps extends IHeaderGroupParams {
  headerGetter?: (open?: boolean) => string;
}

const ToggleGroupHeader = (props: ToggleGroupHeaderProps) => {
  const localColumn = useRef<(ColumnGroup<any> | Column<any>) | null>();
  const localSortState = useRef<string | null>();

  const handleToggle = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    const columnGroup = props.columnGroup.getProvidedColumnGroup();
    const columnGroupStates = props.api.getColumnGroupState();

    const columnGroupState = columnGroupStates.find(
      (item) => item.groupId === columnGroup.getId()
    );
    if (columnGroupState) {
      props.api.setColumnGroupOpened(columnGroup, !columnGroupState.open);
      props.api.refreshHeader();
    }
  };

  const getColumnOpened = () => {
    const columnGroup = props.columnGroup.getProvidedColumnGroup();
    const columnGroupStates = props.api.getColumnGroupState();

    const columnGroupState = columnGroupStates.find(
      (item) => item.groupId === columnGroup.getId()
    );

    return columnGroupState?.open;
  };

  const handleSort = () => {
    if (localColumn.current) {
      const sortingOrder = props.api.getGridOption("sortingOrder") ?? [
        "asc",
        "desc",
        null,
      ];
      let sortIdx =
        sortingOrder.findIndex((item) => item === localSortState.current) + 1;
      if (sortIdx > 2) {
        sortIdx = 0;
      }
      props.api.applyColumnState({
        state: [
          {
            colId: localColumn.current.getUniqueId(),
            sort: sortingOrder[sortIdx],
          },
        ],
        defaultState: { sort: null },
      });
      props.api.refreshHeader();
    }
  };

  const displayedChildren = props.columnGroup.getDisplayedChildren();
  if (displayedChildren && displayedChildren.length > 0) {
    localColumn.current = displayedChildren[0];
    const sortable = (localColumn.current.getDefinition() as ColDef).sortable;
    const groupSortable = (props.columnGroup.getDefinition() as ColDef)
      .sortable;
    const columnState = props.api
      .getColumnState()
      .find((item) => item.colId === localColumn.current?.getUniqueId());
    localSortState.current = columnState?.sort;
    const headerValueGetter =
      localColumn.current.getDefinition()!.headerValueGetter;

    let headerName;
    if (props.headerGetter) {
      headerName = props.headerGetter(getColumnOpened());
    } else if (headerValueGetter && typeof headerValueGetter === "function") {
      headerName = headerValueGetter({
        api: props.api,
        colDef: localColumn.current.getDefinition()! as ColDef,
        providedColumnGroup: null,
        location: null,
        context: undefined,
      });
    }

    return (
      <div
        className={`toggle-group-header w-full px-[0.6rem] ${
          sortable === true && groupSortable === true ? "cursor-ns-resize" : ""
        }`}
        {...(sortable === true &&
          groupSortable === true && { onClick: handleSort })}
      >
        <div className="flex items-center justify-between w-full">
          <CaretLeft
            width={10}
            height={10}
            className="cursor-pointer h-[1.4rem]"
            onTouchStart={handleToggle}
            onClick={handleToggle}
          />
          {headerName}
          {localSortState.current != null && (
            <div
              className={`ag-icon ${
                localSortState.current === "asc"
                  ? "ag-icon-asc"
                  : "ag-icon-desc"
              }`}
            />
          )}
          <CaretRight
            width={10}
            height={10}
            className="cursor-pointer h-[1.4rem]"
            onTouchStart={handleToggle}
            onClick={handleToggle}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default ToggleGroupHeader;
