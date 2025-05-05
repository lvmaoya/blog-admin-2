import { get, post } from "@/service/common/apiService";

export async function commentListData(data) {
  return await get("/comment/list", data);
}
export async function disableComment(data) {
  return await post("/comment/updateStatus", data);
}
