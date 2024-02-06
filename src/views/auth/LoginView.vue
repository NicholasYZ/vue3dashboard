<template>
  <div
    class="bg-gradient-to-b from-gray-900 to-gray-700 h-screen w-screen flex flex-col justify-center items-center text-center"
  >
    <h1 class="text-3xl m-4 font-bold text-slate-50">VD</h1>
    <div
      class="p-12 m-4 rounded-xl bg-[#fff] w-1/3 min-w-max shadow hover:shadow-md overflow-hidden"
      v-loading="loading"
    >
      <div class="mb-6">
        <h2 class="text-2xl mb-4 text-slate-600">{{ $t("login") }}</h2>
        <p class="text-slate-400 text-sm">
          {{ $t("Vue Dashboard, To create unique Saas platform!") }}
        </p>
      </div>
      <div class="mb-6">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
          <el-form-item class="mb-4" label="" prop="username">
            <el-input
              size="large"
              v-model="form.username"
              :placeholder="$t('username')"
              type="text"
            />
          </el-form-item>
          <el-form-item class="mb-4" label="" prop="password">
            <el-input
              size="large"
              v-model="form.password"
              :placeholder="$t('password')"
              type="password"
            />
          </el-form-item>
        </el-form>
        <div class="mb-4 text-left text-sm text-red-600" v-if="errMsg">
          * {{ errMsg }}
        </div>
      </div>
      <div>
        <el-button
          size="large"
          type="primary"
          style="width: 100%"
          @click="onSubmit(ruleFormRef)"
          >{{ $t("confirm") }}
        </el-button>
      </div>
    </div>
    <div class="text-slate-400 text-sm">
      <p>
        Vue Dashboard &copy; <a href="/">{{ $t("forget password ?") }}</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const errMsg = ref<string>();
const form = reactive({
  username: "admin",
  password: "bpNOg4Wu1klKVPqJ",
});
const rules = reactive<FormRules>({
  username: [{ required: true }],
  password: [{ required: true }],
});

const onSubmit = async (formEl: FormInstance | undefined) => {
  const store = useUserStore();
  if (!formEl) return;
  loading.value = true;
  try {
    await formEl.validate();
    await store.login(form);
    router.push({
      path: (route.query.redirect || "/") as string,
    });
  } catch (error: any) {
    console.log(error);
    errMsg.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss"></style>
