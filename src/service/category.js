import { get, post, del } from "@/service/common/apiService";

export async function categoryListData() {
  return await get("/category/list");
}

export async function addOrUpdateCategory(data) {
  return await post("/category", data);
}
export async function deleteCategory(id) {
  return await del("/category/" + id);
}