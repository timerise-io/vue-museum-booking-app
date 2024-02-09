import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { apolloClient } from './lib/apolloClient'
import { createApolloProvider } from '@vue/apollo-option'

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp(App)

app.use(apolloProvider)

app.use(router)

app.mount('#app')
