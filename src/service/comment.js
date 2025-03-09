import { get, post } from "@/service/common/apiService";

export async function commentListData(data) {
  return await post("/comment/list", data);
}