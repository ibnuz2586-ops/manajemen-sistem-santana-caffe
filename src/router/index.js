import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import CustomerCatalogView from '@/views/CustomerCatalogView.vue'
import OrderTrackingView from '@/views/OrderTrackingView.vue'
import LoginView from '@/views/LoginView.vue'
import OwnerDashboardView from '@/views/OwnerDashboardView.vue'
import ProductManagementView from '@/views/ProductManagementView.vue'
import CashierPosView from '@/views/CashierPosView.vue'
import TransactionHistoryView from '@/views/TransactionHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'catalog', component: CustomerCatalogView },
    { path: '/track', name: 'track', component: OrderTrackingView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/owner/dashboard', name: 'owner-dashboard', component: OwnerDashboardView, meta: { requiresAuth: true, roles: ['Pemilik'] } },
    { path: '/owner/products', name: 'owner-products', component: ProductManagementView, meta: { requiresAuth: true, roles: ['Pemilik'] } },
    { path: '/cashier/pos', name: 'cashier-pos', component: CashierPosView, meta: { requiresAuth: true, roles: ['Kasir'] } },
    { path: '/transactions', name: 'transactions', component: TransactionHistoryView, meta: { requiresAuth: true, roles: ['Pemilik', 'Kasir'] } }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.currentUser) authStore.initAuth()
  const user = authStore.currentUser
  if (to.meta.requiresAuth && !user) return next('/login')
  if (to.meta.roles && user && !to.meta.roles.includes(user.role)) {
    const fallback = user.role === 'Pemilik' ? '/owner/dashboard' : '/cashier/pos'
    return next({ path: fallback, query: { denied: '1' } })
  }
  next()
})

export default router
