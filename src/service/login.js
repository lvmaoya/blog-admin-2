import { get, post } from "@/service/common/apiService";
export async function logout() {
  return await get("/logout");
}
export async function login(data) {
  return await post("/login", data);
}