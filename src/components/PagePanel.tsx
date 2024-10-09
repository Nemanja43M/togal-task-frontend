import React, { ReactNode } from "react";

import { PagePanelBox } from "../layout/styled";

export const PagePanel: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <PagePanelBox>{children}</PagePanelBox>;
};
