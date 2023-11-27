<script setup lang="ts">
import { useDataStore } from "../stores/dataStore";
import { storeToRefs } from "pinia";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
});

const onSubmit = (values: any) => {
  console.log(values);
};

const { editData } = storeToRefs(useDataStore());
</script>

<template>
  <div>
    <VForm @submit="onSubmit" :validation-schema="schema">
      <div class="list">
        <div class="block">
          <h2>廣告標題 <span>*</span></h2>
          <VField
            name="title"
            type="text"
            placeholder="請輸入廣告標題"
            :class="[{ 'error-input': editData.title === '' }]"
            v-model="editData.title"
          />
          <br />
          <ErrorMessage name="title" class="error" />
        </div>
        <div class="block">
          <h2>廣告標題 <span>*</span></h2>
          <VField name="status">
            <select v-model="editData.status">
              <option value="" disabled>請選擇</option>
              <option value="0">啟用</option>
              <option value="1">未啟用</option>
            </select>
          </VField>
          <br />
          <ErrorMessage name="status" class="error" />
        </div>
      </div>
      <div class="list">
        <div class="block">
          <h2>廣告連結</h2>
          <VField
            name="title"
            type="text"
            placeholder="請輸入廣告連結"
            v-model="editData.link"
          />
        </div>
      </div>
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: row;
  justify-content: start;
  .block {
    margin-right: 10px;
  }
}
h2 {
  margin: 0;
  span {
    color: red;
  }
}
.error {
  color: red;
}
.error-input {
  border: 1px solid red;
}
input {
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 3px;
  font-size: 15px;
  line-height: normal;
  font-weight: 400;
  border: none;
  width: 300px;
  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px #719ece;
  }
}
select {
  font-size: 15px;
  font-weight: 400;
  line-height: normal;
  padding: 3px;
  width: 150px;
  height: 30px;
  cursor: pointer;
  padding: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  option {
    font-weight: 500;
  }
}
</style>
