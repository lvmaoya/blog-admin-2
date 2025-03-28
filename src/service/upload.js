import { get, post } from "@/service/common/apiService";

export async function uploadFile(data) {
  return await post("/upload", data);
}