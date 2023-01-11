<template>
  <el-form :label-width="width + 'px'" :model="formData" ref="form">
    <!-- 动态表单选项 -->
    <template v-for="(item, itemI) in formItem">
      <el-form-item
        :key="itemI"
        :label="item.label"
        :label-width="item.width ? item.width + 'px' : ''"
        :rules="item.rules"
        :prop="item.field"
      >
        <!-- 内容 -->
        <!-- 普通文本 -->
        <template v-if="item.type === 'input'">
          <el-input
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :prefix-icon="item.icon"
            v-model="formData[item.field]"
            :style="{
              width: item.payload ? item.payload.width + 'px' : '100%',
            }"
          ></el-input>
        </template>
        <!-- 普通文本 -->

        <!-- 密码框 -->
        <template v-if="item.type === 'password'">
          <el-input
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :prefix-icon="item.icon"
            v-model="formData[item.field]"
            show-password
          ></el-input>
        </template>
        <!-- 密码框 -->

        <!-- 选择框 -->
        <template v-if="item.type === 'select'">
          <el-select
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            v-model="formData[item.field]"
          >
            <el-option
              v-for="(temp, tempI) in item.payload"
              :key="tempI"
              :label="temp.label"
              :value="temp.value"
            ></el-option>
          </el-select>
        </template>
        <!-- 选择框 -->

        <template v-if="item.type === 'cascader'">
          <el-cascader
            v-model="formData[item.field]"
            :options="item.payload.options"
            :props="item.payload.props || { label: 'label' }"
          ></el-cascader>
        </template>
      </el-form-item>
      <!-- 内容 -->
    </template>
    <!-- 动态表单选项 -->

    <!-- 动态表单按钮 -->
    <el-form-item>
      <template v-for="(btn, btnI) in formBtns">
        <el-button
          :key="btnI"
          :type="btn.type"
          :size="btn.size || 'mini'"
          @click="submitFn(btn.content, btn.click)"
        >
          <i :class="btn.icon"></i>
          {{ btn.content }}
        </el-button>
      </template>
    </el-form-item>
    <!-- 动态表单按钮 -->
  </el-form>
</template>

<script>
export default {
  watch: {
    row: {
      handler(newRow) {
        //创建为null,编辑有参数
        if (!newRow) return;
        this.formData = newRow;
      },
      deep: true,
      immediate: true,
    },
  },
  props: {
    row: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: 0,
    },
    formItem: {
      type: Array,
      required: true,
    },
    formBtns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    submitFn(content, callback) {
      // 判断
      switch (content) {
        case "重置":
          // TODO: 首次重置有BUG 影响数据保存
          if (Object.keys(this.formData).length > 0) {
            this.$refs.form.resetFields();
          }
          return;
        case undefined:
          callback();
          return;
        default:
          break;
      }
      // 获取数据
      this.$refs.form.validate((isSuccss) => {
        if (isSuccss) {
          callback(this.formData);
        }
      });
    },
  },
  // ...
};
</script>
