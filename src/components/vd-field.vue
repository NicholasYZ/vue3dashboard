<script setup lang="ts">
import { computed, useAttrs } from "vue";
const props = defineProps(["val"]);
const attrs = useAttrs();
const emit = defineEmits(["update:val", "change"]);
const value = computed({
  get() {
    return props.val;
  },
  set(value) {
    emit("update:val", value);
    emit("change", { prop: attrs.prop, value });
  },
});
</script>
<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
};
</script>
<template>
  <el-col :span="$attrs.span || 12">
    <el-form-item :label="$attrs.label || $attrs.name" :prop="$attrs.prop">
      <div class="flex items-center justify-between w-full">
        <slot name="prepend"></slot>
        <slot>
          <el-input
            v-if="
              $attrs.type === 'text' ||
              $attrs.type === 'password' ||
              $attrs.type === 'number' ||
              !$attrs.type
            "
            :size="$attrs.size || 'large'"
            v-model="value"
            :placeholder="$attrs.placeholder"
            :disabled="$attrs.disabled"
            :rows="$attrs.rows"
            :type="$attrs.type || 'text'"
            class="vd-input"
            :class="$attrs.extraClass"
          />

          <el-select
            v-if="$attrs.type === 'select'"
            v-model="value"
            :placeholder="$attrs.placeholder"
            :size="$attrs.size || 'large'"
            :disabled="$attrs.disabled"
            :filterable="$attrs.filterable"
            style="width: 100%"
            class="vd-input"
            :class="$attrs.extraClass"
          >
            <el-option
              v-for="(val, key) in $attrs.dict"
              :key="key"
              :label="$t(val)"
              :value="key"
            />
          </el-select>

          <el-select
            v-if="$attrs.type === 'select-multiple'"
            v-model="value"
            :placeholder="$attrs.placeholder"
            :size="$attrs.size || 'large'"
            :disabled="$attrs.disabled"
            multiple
            style="width: 100%"
            class="vd-input"
          >
            <el-option
              v-for="(val, key) in $attrs.dict"
              :key="key"
              :label="$t(val)"
              :value="key"
            />
          </el-select>

          <el-input
            v-if="$attrs.type === 'textarea'"
            v-model="value"
            :rows="$attrs.rows"
            :disabled="$attrs.disabled"
            type="textarea"
            :placeholder="$attrs.placeholder"
            class="vd-input"
          />

          <el-radio-group
            v-if="$attrs.type === 'radio'"
            :size="$attrs.size || 'large'"
            v-model="value"
          >
            <el-radio
              v-for="(val, key) in $attrs.dict"
              :key="key"
              :label="key"
              :disabled="$attrs.disabled"
            >
              {{ val }}
            </el-radio>
          </el-radio-group>

          <el-switch
            v-if="$attrs.type === 'switch'"
            :size="$attrs.size || 'large'"
            v-model="value"
          />

          <el-tree-select
            v-if="
              $attrs.type === 'tree-select' ||
              $attrs.type === 'tree-select-multiple'
            "
            v-model="value"
            :data="$attrs.dict"
            :check-strictly="true"
            :default-checked-keys="[value]"
            :render-after-expand="false"
            show-checkbox
            check-on-click-node
            :multiple="$attrs.type === 'tree-select-multiple'"
            :disabled="$attrs.disabled"
            :size="$attrs.size || 'large'"
            class="vd-input"
          />

          <el-date-picker
            v-if="$attrs.type === 'datepicker'"
            v-model="value"
            type="datetime"
            :size="$attrs.size || 'large'"
            :disabled="$attrs.disabled"
            placeholder="请选择时间"
            class="vd-input"
          />

          <el-cascader
            v-if="$attrs.type === 'cascader'"
            :options="$attrs.dict"
            v-model="value"
            :props="{ emitPath: false }"
            :show-all-levels="false"
            :size="$attrs.size || 'large'"
            class="vd-input"
          />
        </slot>
        <slot name="append"></slot>
      </div>
    </el-form-item>
  </el-col>
</template>

<style lang="scss">
.el-form-item {
  align-items: center;
}
.vd-input {
  width: 100% !important;
  .el-input__wrapper {
    width: 100% !important;
  }
  &.has-append {
    width: calc(100% - 50px) !important;
  }
}
</style>
