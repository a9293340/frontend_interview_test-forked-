import { defineStore } from "pinia";
import { ref } from "vue";
import type { DefaultData } from "common-types";

export const useDataStore = defineStore("data", () => {
  const raw_data = ref<DefaultData[]>();
  const imageArr = ref<any[]>([]);

  const editData = ref<DefaultData>({
    id: 0,
    title: "",
    imgage: "",
    status: 0,
    link: "",
  });

  return {
    raw_data,
    imageArr,
    editData,
  };
});
