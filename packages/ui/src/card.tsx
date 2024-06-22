import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 bg-white rounded-xl bg-[#ededed]"
    >
      <div className="text-xl border-b pb-2">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
