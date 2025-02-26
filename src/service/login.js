import { get, post } from "@/service/common/apiService";
export async function logout() {
  return await get("/logout");
}
export function login(data) {
  return post("/login", data);
}