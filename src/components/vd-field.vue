<script setup lang="ts">
import { computed } from "vue";
const props = defineProps([
  "val",
  "prop",
  "name",
  "size",
  "dict",
  "type",
  "rows",
  "span",
  "disabled",
  "placeholder",
]);
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
  <el-col :span="span || 24">
    <el-form-item :label="$t(name)" :prop="prop">
      <slot>
        <el-input
          v-if="type === 'text' || !type"
          :size="size || 'large'"
          v-model="value"
          :placeholder="$t(placeholder)"
          :disabled="disabled"
          type="text"
        />

        <el-select
          v-if="type === 'select'"
          v-model="value"
          :placeholder="$t(placeholder)"
          :size="size || 'large'"
          :disabled="disabled"
          style="width: 100%"
        >
          <el-option
            v-for="(val, key) in dict"
            :key="key"
            :label="$t(val)"
            :value="key"
          />
        </el-select>

        <el-input
          v-if="type === 'textarea'"
          v-model="value"
          :rows="rows"
          :disabled="disabled"
          type="textarea"
          :placeholder="$t(placeholder)"
        />

        <el-radio-group v-if="type === 'radio'" v-model="value">
          <el-radio
            :size="size"
            v-for="(val, key) in dict"
            :key="key"
            :label="key"
            :disabled="disabled"
          >
            {{ $t(val) }}
          </el-radio>
        </el-radio-group>
      </slot>
    </el-form-item>
  </el-col>
</template>
