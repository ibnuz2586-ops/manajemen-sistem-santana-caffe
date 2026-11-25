<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="public-layout">
    <header class="public-navbar"><div class="container nav-inner"><div class="logo">☕ <strong>Santana Caffe</strong></div><nav class="nav-links"><RouterLink to="/">Katalog Menu</RouterLink><RouterLink to="/track">Lacak Pesanan</RouterLink><RouterLink to="/login" class="staff-btn">Login Staf</RouterLink></nav></div></header>
    <main class="container main-content"><slot /></main>
  </div>
</template>
<style scoped>
.public-navbar { background: var(--color-primary); color: #ffffff; padding: 14px 0; box-shadow: var(--shadow-sm); }
.container { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
.nav-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.logo { font-size: 18px; }
.nav-links { display: flex; align-items: center; gap: 18px; }
.nav-links a { color: #f3eae2; text-decoration: none; font-weight: 500; font-size: 13px; }
.nav-links a.router-link-active { color: #ffffff; font-weight: 700; border-bottom: 2px solid var(--color-secondary); padding-bottom: 2px; }
.staff-btn { background: var(--color-secondary); color: #ffffff !important; padding: 7px 14px; border-radius: 8px; border-bottom: none !important; }
.main-content { padding-top: 28px; padding-bottom: 40px; }
</style>
