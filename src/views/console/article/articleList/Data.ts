export interface Article {
    authorId: string;
    category: null | string;
    categoryId: string;
    content: null | string;
    coverImage: string;
    deleted: number;
    description: string;
    fatherCategoryId: string;
    id: string;
    pageView: number;
    preferNum: number;
    privacy: number;
    publishedTime: string;
    status: number;
    title: string;
    top: number;
    updatedTime: null | string;
}