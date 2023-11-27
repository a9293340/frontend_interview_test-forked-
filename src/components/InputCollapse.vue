<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["search", "add"]);
const inputData = ref("");

const searchData = () => {
  emits("search", inputData.value);
};

const addData = () => {
  emits("add", true);
};
</script>

<template>
  <div class="collapse">
    <el-collapse accordion>
      <el-collapse-item title="Consistency" name="1">
        <div class="input-zone">
          <h2>標題</h2>
          <el-input
            v-model="inputData"
            placeholder="請輸入標題"
            style="height: 30px; width: 200px"
          />
        </div>
        <div class="btn-zone">
          <el-button type="primary" @click="searchData">
            <el-icon><Search /></el-icon>
            查詢
          </el-button>
          <el-button type="success" @click="addData">
            <el-icon><Plus /></el-icon>
            新增
          </el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
.collapse {
  width: 700px;
  background-color: #33ccff;
  border-radius: 5px;
  overflow: hidden;
  .input-zone {
    color: black;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    h2 {
      margin: 0;
      margin-right: 5px;
    }
  }
  .btn-zone {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: #aaaaaa;
  }
}

::v-deep .el-collapse-item__header {
  color: #fff;
  background-color: #33ccff !important;
  position: relative;
  padding-left: 10px;
  height: auto;
}
::v-deep .el-collapse-item__content {
  text-align: left;
  color: #fff;
  background-color: white;
  padding-bottom: 0;
}
</style>
