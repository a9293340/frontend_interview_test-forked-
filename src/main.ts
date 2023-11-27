import { createApp } from "vue";
import { createPinia } from "pinia";
import { Field, defineRule, Form, ErrorMessage } from "vee-validate";
import { required } from "@vee-validate/rules";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
const app = createApp(App);
defineRule("required", required);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);
app.use(createPinia());
app.use(ElementPlus);
app.mount("#app");
