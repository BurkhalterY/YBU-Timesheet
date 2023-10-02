import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"
import { time } from "./directives"
import "./style.css"

const app = createApp(App)

app.directive("time", time)
app.use(createPinia())
app.mount("#app")
