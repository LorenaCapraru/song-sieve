"use client";

import { RecoilRoot } from "recoil";
import { ReactNode } from "react";

// you need to create a component to wrap your app in
const RecoilRootWrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

export default RecoilRootWrapper;
