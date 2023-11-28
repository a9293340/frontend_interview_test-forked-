<script setup lang="ts">
import { useDataStore } from "../stores/dataStore";
import { storeToRefs } from "pinia";
import * as yup from "yup";
import { genFileId } from "element-plus";
import { getBase64, getImageBase64 } from "../utils/getBase";
import { ElMessage } from "element-plus";
import { httpReq } from "../utils/http";
import type { DefaultData } from "common-types";
const { editData, editType, originImagePath } = storeToRefs(useDataStore());

const emits = defineEmits(["close"]);

const schema = yup.object({
	title: yup.string().required(),
});

const upload = ref();
const imageBase64 = ref("");
const errorInput = ref(false);

watch(editData, async () => {
	await checkHasOriginImage();
});

const checkHasOriginImage = async () => {
	imageBase64.value = await getImageBase64(editData.value.image);
};

const onSubmit = async (values: any) => {
	// 判斷邏輯
	if (!values.title) {
		errorInput.value = true;
		return;
	}

	errorInput.value = false;

	try {
		// 取得原始圖檔
		originImagePath.value = (
			await httpReq<DefaultData[]>(`/api/posts?id=${editData.value.id}`)
		)[0].image;

		// 取得所有資料用到的圖檔
		const imagesList = (await httpReq<DefaultData[]>(`/api/posts`)).map(
			(el) => el.image
		);

		// 更換圖片需要清除原先圖檔;
		// 需要原本有圖片 且圖片並未與其他資料庫共用
		if (
			originImagePath.value !== "" &&
			!imagesList.find((x) => x === originImagePath.value)
		)
			await fetch("/img/api/saveImage", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fileName: originImagePath.value,
				}),
			});
		// 儲存圖檔
		if (imageBase64.value)
			await fetch("/img/api/saveImage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					base64Data: imageBase64.value,
					fileName: editData.value.image,
				}),
			});

		// 判斷為Add or Edit
		if (editType.value === "Add") {
			const res = await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editData.value),
			});
		} else {
			const res = await fetch(`/api/posts/${editData.value.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editData.value),
			});
		}

		ElMessage({
			message: editType.value + "成功!",
			type: "success",
		});
	} catch (error) {
		if (error)
			ElMessage({
				message: error as string,
				type: "warning",
			});
	}
	// 清空
	originImagePath.value = "";
	imageBase64.value = "";

	emits("close");
};

const getBase = async (files: any) => {
	editData.value.image = `/images/${files.name}`;
	imageBase64.value = (await getBase64(files.raw)) as string;
};

const handleExceed = async (files: any) => {
	upload.value.clearFiles();
	const file = files[0];
	file.uid = genFileId();
	upload.value.handleStart(file);
};

onMounted(async () => {
	await checkHasOriginImage();
});
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
						:class="[{ 'error-input': errorInput }]"
						v-model="editData.title"
					/>
					<br />
					<ErrorMessage name="title" class="error" />
				</div>
				<div class="block">
					<h2>廣告標題 <span>*</span></h2>
					<VField name="status">
						<select v-model.number="editData.status">
							<option value="" disabled>請選擇</option>
							<option :value="0">啟用</option>
							<option :value="1">未啟用</option>
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
						name="link"
						type="text"
						placeholder="請輸入廣告連結"
						v-model="editData.link"
					/>
				</div>
			</div>
			<div class="list">
				<div class="block">
					<h2>廣告圖片</h2>
					<el-upload
						ref="upload"
						class="upload-demo"
						:limit="1"
						:on-exceed="handleExceed"
						:on-change="getBase"
						:auto-upload="false"
						accept="image/jpg,image/jpeg,image/png,image/svg"
						list-type="picture"
					>
						<img
							v-if="imageBase64"
							:src="imageBase64"
							class="avatar"
							style="width: 400px"
						/>
						<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>
				</div>
			</div>
			<div class="list">
				<el-button type="primary" native-type="submit" @click="onSubmit"
					>儲存</el-button
				>
				<el-button type="info">取消</el-button>
			</div>
		</VForm>
	</div>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
	border: 1px solid black;
	border-radius: 5px;
}
.list {
	display: flex;
	flex-direction: row;
	justify-content: start;
	margin-bottom: 10px;
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
	border: 1px solid black;
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
	border: 1px solid black;
	background-color: rgba(0, 0, 0, 0);
	option {
		font-weight: 500;
	}
}
</style>
