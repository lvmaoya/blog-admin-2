import { get, post, put, del } from "./common/apiService";

export async function articleListData(data) {
  return await post("/blog/list", data);
}

export async function articleDetailData(id) {
  return await get(`/blog/${id}`);
}
export async function deleteArticleData(id) {
  return await del(`/blog/${id}`);
}
export async function postArticle(data) {
  return await post("/blog", data);
}

export async function putTopArticle(id) {
  return await put("/blog/" + id + "/top");
}

export async function articleStatsData(startTime, endTime) {
  return await get(`/blog/stats?startTime=${startTime}&endTime=${endTime}`);
}