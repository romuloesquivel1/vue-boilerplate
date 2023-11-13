import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import localizationPlugin from "@/plugins/localization";
import { translations } from "./locale";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(localizationPlugin, translations)
  .mount("#app");
