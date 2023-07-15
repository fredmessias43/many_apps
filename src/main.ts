import Vue, { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'

// import "./utils/logger.js"

const app = createApp(App)

app.use(router);
app.mount('#app')
