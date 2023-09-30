"use client";
import React from "react";
import { ResponsivePie } from "@nivo/pie";

const props = {
  cornerRadius: 8,
  innerRadius: 0.4,
  margin: { top: 80, right: 120, bottom: 80, left: 120 },
  padAngle: 2,
};

export default function Doughnut({ data }: { data: any }) {
  return (
    <div className="h-[400px] w-[500px] px-8 mx-auto">
      <ResponsivePie data={data} colors={{ scheme: "paired" }} {...props} />
    </div>
  );
}
