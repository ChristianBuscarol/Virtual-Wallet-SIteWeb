import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import CoinCatalogueView from '@/views/CoinCatalogueView.vue'
import UsuaryHistoryView from '@/views/UsuaryHistoryView.vue'

const routes = [
  {
    path: '/',
    name: 'IndexView',
    component: IndexView
  },
  {
    path: '/CoinCatalogueView',
    name: 'CoinCatalogueView',
    component: CoinCatalogueView
  },
  {
    path: '/UsuaryHistoryView',
    name: 'UsuaryHistoryView',
    component: UsuaryHistoryView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
