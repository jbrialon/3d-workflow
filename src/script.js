import "./styles/style.scss";

import { createApp, h } from "vue";
import App from "./App.vue";

import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector("canvas.webgl"));

const app = createApp({
  render: () => h(App),
});

app.mount("#app");
