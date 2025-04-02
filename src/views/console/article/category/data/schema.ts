export type Category = {
  id: number;
  categoryName: string;
  fatherCategoryId: string;
  deleted: number;
  createdTime: Date;
  updatedTime: Date;
}
export function getFatherCategoryName(category): string {
  switch (category) {
    case 1:
      return '项目文章';
    case 2:
      return '学习输出';
    case 3:
      return '日常随笔';
    default:
      return '未知分类';
  }
}