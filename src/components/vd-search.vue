<script setup lang="ts">
defineProps(["config"]);
</script>
<template>
  <div class="vd-search">
    <vd-form :config="config" />
  </div>
</template>

<!-- <template>
  <div class="vd-search">
    <el-form  :inline="true">
      <el-form-item>
        <el-input size="large" placeholder="Please input">
          <template #prepend>
            <el-select size="large" class="w-[100px]" placeholder="Select">
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-button size="large" type="primary">
            {{ $t("confirm") }}
          </el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template> -->
