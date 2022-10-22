<script setup lang="ts">
import { computed } from "vue";
const props = defineProps(["val", "item"]);
const emit = defineEmits(["update:val"]);
const value = computed({
  get() {
    return props.val;
  },
  set(value) {
    emit("update:val", value);
  },
});
</script>
<template>
  <el-form-item :class="item.cls" :label="$t(item.prop)" :prop="item.prop">
    <el-input
      v-if="item.type === 'text' || !item.type"
      :size="item.size || 'large'"
      v-model="value"
      :placeholder="$t(item.prop)"
      type="text"
    />

    <el-select
      v-if="item.type === 'select'"
      v-model="value"
      :placeholder="$t(item.prop)"
      :size="item.size || 'large'"
    >
      <el-option
        v-for="(val, key) in item.dict"
        :key="key"
        :label="$t(val)"
        :value="key"
      />
    </el-select>

    <el-input
      v-if="item.type === 'textarea'"
      v-model="value"
      :rows="item.rows"
      type="textarea"
      :placeholder="$t(item.prop)"
    />

    <el-radio-group v-if="item.type === 'radio'" v-model="value">
      <el-radio
        :size="item.size"
        v-for="(val, key) in item.dict"
        :key="key"
        :label="key"
      >
        {{ $t(val) }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>
