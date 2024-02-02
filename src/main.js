import './assets/form.css'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import QrReader from 'vue3-qr-reader';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const app = createApp(App)

app.use(router)
app.use(QrReader)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('v-select', vSelect)
app.mount('#app')
