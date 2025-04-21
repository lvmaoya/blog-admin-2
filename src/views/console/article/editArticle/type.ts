type PostArticle = {
    id: number | null;
    title: string;
    description: string;
    keywords: string;
    categoryId: number;
    charCount: number;
    fatherCategoryId: number;
    coverImage: string;
    status: number;
    authorId: number;
    top: number;
    content: string;
};

export default PostArticle;    