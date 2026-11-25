<template>
  <div class="auth-wrapper"><div class="auth-card"><div class="brand-header"><span class="brand-badge">☕ SANTANA CAFFE</span><h1>Portal Manajemen & Kasir</h1><p>Masuk untuk mengelola operasional kedai kopi</p></div><slot /></div></div>
</template>
<style scoped>
.auth-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: linear-gradient(135deg, #4a2c2a 0%, #2c1917 100%); }
.auth-card { width: 100%; max-width: 420px; background: #ffffff; border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-md); }
.brand-header { text-align: center; margin-bottom: 24px; }
.brand-badge { display: inline-block; background: var(--color-secondary-light); color: var(--color-primary); font-weight: 700; font-size: 12px; padding: 5px 12px; border-radius: 999px; margin-bottom: 10px; }
.brand-header p { color: var(--color-text-muted); font-size: 13px; margin-top: 4px; }
</style>
