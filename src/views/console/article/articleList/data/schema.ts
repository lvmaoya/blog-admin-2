import { z } from 'zod';
// 你提供的代码使用了 Zod 库来定义一个简单的非关系型数据模式（schema），并将其导出为一个 TypeScript 类型 Article
// 定义 Category schema
const categorySchema = z.object({
  id: z.string(),
  categoryName: z.string(),
  fatherCategoryId: z.string(),
  deleted: z.number(),
  createdTime: z.string(),
  updatedTime: z.string(),
});

// 定义 Article schema
export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: categorySchema.nullable(), // 可能为 null
  categoryId: z.string(),
  fatherCategoryId: z.string(),
  coverImage: z.string(),
  content: z.string().nullable(), // 可能为 null
  pageView: z.number(),
  preferNum: z.number(),
  status: z.string(),
  privacy: z.number(),
  authorId: z.string(),
  top: z.number(),
  deleted: z.number(),
  publishedTime: z.string(),
  updatedTime: z.string().nullable(), // 可能为 null
});

// 导出 Article 类型
export type Article = z.infer<typeof articleSchema>;

// 如果需要定义文章列表的类型
export const articleListSchema = z.array(articleSchema);
export type ArticleList = z.infer<typeof articleListSchema>;