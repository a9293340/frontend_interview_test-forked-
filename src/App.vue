<script setup lang="ts">
import { onMounted } from "vue";
import { httpReq } from "./utils/http";
import type { DefaultData } from "common-types";
import { useDataStore } from "./stores/dataStore";
import { storeToRefs } from "pinia";
import InputCollapse from "./components/InputCollapse.vue";
import List from "./components/List.vue";
import DiaoLogVue from "./components/Dialog.vue";

const { raw_data, imageArr, editType, editData, originImagePath } = storeToRefs(
	useDataStore()
);
const dialogVisible = ref(false);

// 搜尋功能
const searchData = async (inputVal: string) => {
	let path = "/api/posts";
	if (inputVal !== "") path += `?title=${inputVal}`;
	raw_data.value = await httpReq<DefaultData[]>(path);
	imageArr.value = [];
	for (let i = 0; i < raw_data.value.length; i++) {
		const val = raw_data.value[i];
		imageArr.value.push(new URL(val.image, import.meta.url).href);
	}
	// console.log(imageArr.value);
};

const dialogControl_add = (bool: boolean) => {
	editType.value = "Add";
	dialogVisible.value = bool;
};

const dialogControl_edit = (idx: number) => {
	if (editData.value.image !== "") originImagePath.value = editData.value.image;
	if (raw_data.value)
		editData.value = JSON.parse(JSON.stringify(raw_data.value[idx]));

	dialogVisible.value = true;
};

const closeDialog = async () => {
	await searchData("");
	dialogVisible.value = false;
};

onMounted(async () => {
	await searchData("");
});
</script>

<template>
	<InputCollapse @search="searchData" @add="dialogControl_add" />
	<List @open="dialogControl_edit" />

	<el-dialog title="新增資訊" v-model="dialogVisible">
		<DiaoLogVue @close="closeDialog" />
	</el-dialog>
</template>
<style lang="scss">
html,
body {
	padding: 0;
	margin: 0;
	width: 100%;
	height: auto;
	overflow-x: hidden;
}
#app {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
}
</style>
<style lang="scss" scoped></style>
