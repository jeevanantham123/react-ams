import React from "react";

interface PagelayoutProps {
  children: React.ReactNode;
}

const Pagelayout: React.FC<PagelayoutProps> = ({ children }) => {
  return <div className="py-80">{children}</div>;
};

export default Pagelayout;
