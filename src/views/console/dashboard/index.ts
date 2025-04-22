// 定义文章分类的类型
export type ArticleCategory = {
  id: number;
  categoryName: string;
  fatherCategoryId: number;
  deleted: number;
  createdTime: string;
  updatedTime: string;
};

// 定义文章的类型
export type Article = {
  id: number;
  title: string;
  description: string;
  keywords: string;
  articleAbstract: string;
  category: ArticleCategory;
  categoryId: number;
  fatherCategoryId: number;
  coverImage: string;
  content: null | string; // 因为 content 可能为 null，所以类型定义为 null | string
  charCount: number;
  pageView: number;
  preferNum: number;
  status: number;
  authorId: number;
  top: number;
  deleted: number;
  publishedTime: string;
  updatedTime: string;
};

export type DataType = {
  articleCount: Array<number>
  pageView: Array<number>
  charCount: Array<number>
  preferNum: Array<number>
  timeRange: Array<string>
}

export type BarDataType = {
  charCount: Array<number>
}

// 定义按 father_category_id 统计的每一项的类型
export type CategoryCountItem = {
  father_category_id: number;
  count: number;
};

// 定义整个博客统计信息的类型
export type BlogStatistics = {
  totalBlogCount: number;
  lastMonthBlogCount: number;
  totalCharCount: number;
  lastMonthCharCount: number;
  totalPageView: number;
  lastMonthPageView: number;
  categoryCountList: CategoryCountItem[];
};