import { get, post } from "./common/apiService";

export async function articleListData(data) {
  return await post("/blog/list", data);
}

export async function articleDetailData(id) {
  return await get(`/blog/${id}`);
}
export async function postArticle(data) {
  return await post("/blog", data);
}