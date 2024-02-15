import './assets/form.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-select/dist/vue-select.css'
import { Tooltip } from 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import QrReader from 'vue3-qr-reader'
import VueQrcode from 'vue-qrcode'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import './boostrap'

const app = createApp(App)

app.directive('tooltip', {
  mounted(el) {
    el.dataset.bsToggle = 'tooltip'
    el.dataset.bsPlacement = 'top'
    el.title = el.getAttribute('title')
    new Tooltip(el)
  }
})

app.use(router)
app.use(QrReader)
app.component('vue-qrcode', VueQrcode)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('v-select', vSelect)
app.mount('#app')
