import { createApp } from 'vue'

// IMPORT SCSS
import "./assets/scss/style.scss";

import App from './App.vue'

// IMPORT BOOTSTRAP
import * as bootstrap from "bootstrap";


createApp(App)
.use(router)
.mount('#app')
