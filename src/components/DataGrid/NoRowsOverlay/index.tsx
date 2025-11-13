"use client";
import React from "react";
import { CustomNoRowsOverlayProps } from "ag-grid-react";
import NoRowIcon from "@/svg/NoRowIcon";

const NoRowsOverlay = ({
  content = "Không có dữ liệu",
}: CustomNoRowsOverlayProps & { content?: string }) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <NoRowIcon className="size-[2.8rem] 2xl:size-[2.4rem]" />
      <div className="text-base-2 text-[1.7rem] mt-1 2xl:text-[1.4rem]">
        {content}
      </div>
    </div>
  );
};

export default NoRowsOverlay;
