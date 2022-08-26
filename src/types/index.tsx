import { ReactNode } from "react";

export interface AppContainerProps {
  children: ReactNode;
}

export interface Boxset {
  id: string | number;
  code: string;
  name: string;
  release_date: string;
  base_set_size: number;
  total_set_size: number;
  set_type: string;
  created_at: Date;
  updated_at: Date;
}
