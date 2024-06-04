import './assets/main.css'
import 'vant/lib/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { 
  Button,
  Search,
  Cell,
  SwipeCell,
  NoticeBar,
  Divider,
  ActionSheet,
  DropdownMenu,
  DropdownItem,
} from 'vant'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// vant组件
app.use(Button)
app.use(Search)
app.use(Cell)
app.use(SwipeCell)
app.use(NoticeBar)
app.use(Divider)
app.use(ActionSheet)
app.use(DropdownMenu)
app.use(DropdownItem)

app.mount('#app')
