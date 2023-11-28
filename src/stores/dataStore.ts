import { defineStore } from "pinia";
import { ref } from "vue";
import type { DefaultData, EditType } from "common-types";

export const useDataStore = defineStore("data", () => {
	// 當前搜尋之內容
	const raw_data = ref<DefaultData[]>();

	// 當前搜尋內容之image url
	const imageArr = ref<any[]>([]);

	// 修改目標
	const editData = ref<DefaultData>({
		id: 0,
		title: "",
		image: "",
		status: 0,
		link: "",
	});

	// 編輯形式
	const editType = ref<EditType>("Edit");

	// 儲存前一個檔案
	const originImagePath = ref("");

	return {
		raw_data,
		imageArr,
		editData,
		editType,
		originImagePath,
	};
});
