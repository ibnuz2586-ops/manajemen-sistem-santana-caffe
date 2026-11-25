<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import BaseButton from '@/components/common/BaseButton.vue'
const authStore = useAuthStore(); const router = useRouter(); const route = useRoute()
function handleLogout() { authStore.logout(); router.push('/login') }
</script>
<template>
  <div class="dash-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">☕ <strong>Santana Caffe</strong><span class="role-pill">{{ authStore.currentUser?.role }}</span></div>
      <nav class="sidebar-nav">
        <template v-if="authStore.currentUser?.role === 'Pemilik'"><RouterLink to="/owner/dashboard">Ringkasan Pendapatan</RouterLink><RouterLink to="/owner/products">Manajemen Menu</RouterLink><RouterLink to="/transactions">Riwayat Transaksi</RouterLink></template>
        <template v-if="authStore.currentUser?.role === 'Kasir'"><RouterLink to="/cashier/pos">Transaksi Kasir (POS)</RouterLink><RouterLink to="/transactions">Daftar & Status Pesanan</RouterLink></template>
        <RouterLink to="/">Lihat Katalog Pelanggan</RouterLink>
      </nav>
      <div class="sidebar-footer"><div class="user-info"><strong>{{ authStore.currentUser?.name }}</strong><small>@{{ authStore.currentUser?.username }}</small></div><BaseButton variant="outline" size="sm" block @click="handleLogout">Keluar (Logout)</BaseButton></div>
    </aside>
    <main class="dash-content">
      <div v-if="route.query.denied" class="alert alert-warning">Akses ditolak! Halaman tersebut hanya dapat diakses oleh role Pemilik.</div>
      <slot />
    </main>
  </div>
</template>
<style scoped>
.dash-layout { display: flex; min-height: 100vh; }
.sidebar { width: 250px; background: var(--color-primary); color: #ffffff; padding: 22px 16px; display: flex; flex-direction: column; justify-content: space-between; flex-shrink: 0; }
.sidebar-brand { display: flex; flex-direction: column; gap: 6px; font-size: 18px; padding-bottom: 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.14); }
.role-pill { display: inline-block; width: fit-content; background: var(--color-secondary); font-size: 11px; padding: 2px 10px; border-radius: 999px; font-weight: 600; }
.sidebar-nav { display: flex; flex-direction: column; gap: 6px; margin-top: 20px; flex: 1; }
.sidebar-nav a { color: #e8dcd2; text-decoration: none; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; }
.sidebar-nav a:hover, .sidebar-nav a.router-link-active { background: rgba(255, 255, 255, 0.14); color: #ffffff; font-weight: 600; }
.sidebar-footer { padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.14); }
.user-info { display: flex; flex-direction: column; margin-bottom: 10px; }
.user-info small { color: #d7c7bc; }
.dash-content { flex: 1; padding: 26px; overflow-x: hidden; }
@media (max-width: 768px) { .dash-layout { flex-direction: column; } .sidebar { width: 100%; } }
</style>
