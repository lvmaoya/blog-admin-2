import { get, post } from "@/service/common/apiService";

export async function categoryListData() {
  return await get("/category/list");
}