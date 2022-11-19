import { ref } from "vue";
import { defineStore } from "pinia";
import { storage } from "@/utils";
import { Login, GetUserInfo } from "@/api";

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
  const USER_TOKEN = ref<string>("");

  const login = async (state: LoginProps) => {
    const {
      result: { token },
    } = await Login(state);
    USER_TOKEN.value = token;
    storage.setItem("USER_TOKEN", token);
  };

  const logout = () => {
    userData.value = {} as userInfoProps;
    storage.removeItem("userData");
  };

  const getUserInfo = async () => {
    const { result } = await GetUserInfo();
    storage.setItem("userData", result);
    userData.value = result;
    return userData.value;
  };

  return { userData, login, logout, getUserInfo };
});
