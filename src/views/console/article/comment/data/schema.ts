export type CommentInfo = {
  id: number;
  articleId: number;
  type: number;
  rootId: number | null;
  toUserId: number;
  toUserName: string;
  avatar: string;
  userName: string;
  email: string | null;
  content: string;
  status: number;
  preferNumber: number;
  deleted: number;
  createdTime: string;
  updatedTime: string | null;
};