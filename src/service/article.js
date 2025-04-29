import { get, post, put, del } from "./common/apiService";

export async function articleListData(data) {
  return await get("/blog/list", data);
}
export async function articleUpdate(data) {
  return await put("/blog", data);
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
export async function putDisableArticle(id) {
  return await put("/blog/" + id + "/disable");
}

export async function articleStatsData(startTime, endTime) {
  return await get(`/blog/stats?startTime=${startTime}&endTime=${endTime}`);
}
export async function blogStatisticsData() {
  return await get(`/blog/stats/statistics`);
}
export async function onlineUserCount() {
  return await get(`/online/count`);
}
