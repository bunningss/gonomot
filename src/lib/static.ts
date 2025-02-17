import {
  ChevronsDown,
  ChevronsUp,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  Plus,
  ReceiptText,
  ThumbsDown,
  ThumbsUp,
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
  plus: Plus,
  thumbsUp: ThumbsUp,
  ThumbsDown: ThumbsDown,
};

export const permissions = ["create:poll", "cast:vote"];
