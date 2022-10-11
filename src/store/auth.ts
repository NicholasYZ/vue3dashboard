import { ref } from "vue";
import { defineStore } from "pinia";

const initUserData = JSON.parse(
  window.localStorage.getItem("userData") || "{}"
);

interface userInfoProps {
  username?: string;
  password?: string;
  token?: string;
  role?: string;
  init?: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref<userInfoProps>(initUserData as userInfoProps);
  const saveUserData = (state: userInfoProps) => {
    userInfo.value = state;
    window.localStorage.setItem("userData", JSON.stringify(state));
  };
  return { userInfo, saveUserData };
});
