<script setup lang="ts">
import { useDataStore } from "../stores/dataStore";
import { storeToRefs } from "pinia";

const emit = defineEmits(["open"]);
const { raw_data, imageArr } = storeToRefs(useDataStore());

const openEditDialog = (idx: number) => {
	emit("open", idx);
};
</script>

<template>
	<div class="list">
		<el-table :data="raw_data" style="width: 100%">
			<el-table-column prop="image" fixed="left" label="圖片" width="400">
				<template #default="scope">
					<img :src="imageArr[scope.$index]" style="width: 300px" />
				</template>
			</el-table-column>
			<el-table-column prop="title" label="標題" width="150" />
			<el-table-column fixed="right" label="功能" width="150">
				<template #default="scope">
					<el-button
						link
						type="primary"
						size="large"
						@click="openEditDialog(scope.$index)"
					>
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
