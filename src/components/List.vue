<script setup lang="ts">
import { useDataStore } from "../stores/dataStore";
import { storeToRefs } from "pinia";

const { raw_data,imageArr } = storeToRefs(useDataStore());
</script>

<template>
  <div class="list">
    <el-table :data="raw_data" style="width: 100%">
      <el-table-column prop='imgage' fixed="left" label="圖片" width="400">
        <template #default='scope'>
            <img :src='imageArr[scope.$index]' />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="標題" width="150" />
      <el-table-column fixed="right" label="功能" width="150">
        <template #default>
          <el-button link type="primary" size="large">
            <el-icon><EditPen /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.list {
  width: 700px;
  margin-top: 10px;
  color: white;
}
</style>
