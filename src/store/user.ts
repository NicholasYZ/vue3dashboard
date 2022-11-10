import { ref } from "vue";
import { defineStore } from "pinia";

const initUserData = JSON.parse(
  window.localStorage.getItem("userData") || "{}"
);

type permissionsProps = {
  id: number;
  label: string;
};

interface userInfoProps {
  username: string;
  password: string;
  token?: string;
  role: string;
  init: boolean;
  permissions: permissionsProps[];
}

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<userInfoProps>(initUserData as userInfoProps);
  const saveUserData = (state: userInfoProps) => {
    userInfo.value = state;
    window.localStorage.setItem("userData", JSON.stringify(state));
  };
  return { userInfo, saveUserData };
});
