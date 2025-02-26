import { get, post } from "@/service/common/apiService";
export async function logout() {
  return await get("/api/logout");
}
export async function login(data) {
  return await post("/api/login", data);
}