import { createApp } from 'vue'
import { seedrandom } from 'seedrandom'
import FocusVisible from 'vue-focus-visible'

import App from './App.vue'
import router from './routes'

const app = createApp(App)

app.use(router)
app.use(seedrandom)
app.use(FocusVisible)

app.mount('#page')