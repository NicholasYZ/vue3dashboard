import { ref } from "vue";
import { defineStore } from "pinia";
import { storage, get, post } from "@/utils";

const initUserData = storage.getItem("userData");

type permissionsProps = {
  id: number;
  label: string;
};

type userInfoProps = {
  username: string;
  password: string;
  token?: string;
  roles: string[];
  permissions: permissionsProps[];
};

type LoginProps = {
  username: string;
  password: string;
};

export const useUserStore = defineStore("user", () => {
  const userData = ref<userInfoProps>(initUserData as userInfoProps);
  const token = ref<string>("");

  const login = async (state: LoginProps) => {
    const { result } = await post("/auth/login", state);
    token.value = result.token;
    storage.setItem("token", result.token);
  };

  const logout = () => {
    userData.value = {} as userInfoProps;
    storage.removeItem("userData");
    storage.removeItem("token");
  };

  const getUserInfo = async () => {
    const { result } = await get("/index");
    storage.setItem("userData", result);
    userData.value = result;
    return userData.value;
  };

  return { userData, login, logout, getUserInfo };
});
