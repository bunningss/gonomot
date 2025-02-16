import {
  ChevronsDown,
  ChevronsUp,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  ReceiptText,
  User,
  X,
} from "lucide-react";

export const icons = {
  menu: Menu,
  loading: LoaderCircle,
  upvote: ChevronsUp,
  downvote: ChevronsDown,
  details: ReceiptText,
  user: User,
  logout: LogOut,
  dashboard: LayoutDashboard,
  close: X,
};

export const permissions = ["create:poll"];
