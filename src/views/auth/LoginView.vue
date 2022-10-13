<template>
  <div
    class="bg-gradient-to-b from-gray-900 to-gray-700 h-screen w-screen flex flex-col justify-center items-center text-center"
  >
    <h1 class="text-2xl m-4 font-bold text-slate-800">VD</h1>
    <div
      class="p-12 m-4 rounded-xl bg-[#fff] w-1/3 min-w-max shadow hover:shadow-md"
      v-loading="loading"
    >
      <div class="mb-8">
        <h2 class="text-xl mb-2 text-slate-600">登录</h2>
        <p class="text-slate-400 text-sm">
          Vue Dashboard 创造不一样的管理系统!
        </p>
      </div>
      <div class="mb-8">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
          <div class="mb-4">
            <el-form-item label="" prop="username">
              <el-input
                size="large"
                v-model="form.username"
                placeholder="登录名"
                type="text"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item label="" prop="password">
              <el-input
                size="large"
                v-model="form.password"
                placeholder="密码"
                type="password"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="mb-4">
        <el-button
          size="large"
          type="primary"
          style="width: 100%"
          @click="onSubmit(ruleFormRef)"
          >确定</el-button
        >
      </div>
    </div>
    <div class="text-slate-400 text-sm">
      <p>Vue Dashboard &copy; <a href="/">忘记密码?</a></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { useAuthStore } from "@/store";
import { Login } from "@/api";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const form = reactive({ username: "", password: "" });
const rules = reactive<FormRules>({
  username: [{ required: true }],
  password: [{ required: true }],
});

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  loading.value = true;
  try {
    await formEl.validate();
    const userInfo = await Login(form);
    authStore.saveUserData({
      ...userInfo,
      init: true,
    });
    router.push({
      path: (route.query.redirect || "/") as string,
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss"></style>
