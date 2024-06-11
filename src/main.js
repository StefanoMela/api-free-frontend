import { createApp } from 'vue'

// IMPORT SCSS
import "./assets/scss/style.scss";

// IMPORT BOOTSTRAP
import * as bootstrap from "bootstrap";

// IMPORT ROUTER
import {router} from '../router/index.js';

import App from './App.vue'

createApp(App)
.use(router)
.mount('#app')
