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
  roles: string[];
  permissions: permissionsProps[];
};

type LoginProps = {
  username: string;
  password: string;
};

export const useUserStore = defineStore("user", () => {
  const userData = ref<userInfoProps>(initUserData as userInfoProps);

  const login = async (state: LoginProps) => {
    const { result } = await Login(state);
    userData.value = result;
    storage.setItem("userData", result);
    return Promise.resolve(result);
  };

  const logout = () => {
    userData.value = {} as userInfoProps;
    storage.removeItem("userData");
  };

  return { userData, login, logout };
});
