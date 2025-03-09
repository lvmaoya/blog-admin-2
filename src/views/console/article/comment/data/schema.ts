export type CommentInfo = {
  id: string;
  articleId: string;
  type: number;
  rootId: string | null;
  toUserId: string;
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