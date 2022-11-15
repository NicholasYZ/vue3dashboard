import { ref } from "vue";
import { defineStore } from "pinia";
import { storage } from "@/utils";
import { Login } from "@/api";

const initUserData = storage.getItem("userData");

type permissionsProps = {
  id: number;
  label: string;
};

type userInfoProps = {
  username: string;
  password: string;
  token?: string;
  role: string;
  init: boolean;
  permissions: permissionsProps[];
};

type LoginProps = {
  username: string;
  password: string;
};

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<userInfoProps>(initUserData as userInfoProps);
  const userLogin = async (state: LoginProps) => {
    const { result } = await Login(state);
    userInfo.value = result;
    storage.setItem("userData", result);
  };

  return { userInfo, userLogin };
});
