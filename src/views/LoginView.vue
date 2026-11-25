<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AuthLayout from '@/layouts/AuthLayout.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
const authStore = useAuthStore(); const router = useRouter()
const username = ref(''); const password = ref(''); const errorMessage = ref('')
function handleLogin() {
  errorMessage.value = ''
  const result = authStore.login(username.value, password.value)
  if (!result.success) { errorMessage.value = result.message; return }
  router.push(result.user.role === 'Pemilik' ? '/owner/dashboard' : '/cashier/pos')
}
</script>
<template>
  <AuthLayout>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <form @submit.prevent="handleLogin">
      <BaseInput v-model="username" label="Username" placeholder="Masukkan username (pemilik / kasir1)" />
      <BaseInput v-model="password" type="password" label="Kata Sandi" placeholder="Masukkan kata sandi (123)" />
      <BaseButton type="submit" variant="primary" size="lg" block>Masuk ke Sistem</BaseButton>
    </form>
    <div class="demo-hint">
      <small><strong>Akun Pengujian:</strong></small>
      <small>• Pemilik: <code>pemilik</code> / <code>123</code></small>
      <small>• Kasir: <code>kasir1</code> / <code>123</code></small>
      <RouterLink to="/" class="back-link">← Kembali ke Halaman Pelanggan</RouterLink>
    </div>
  </AuthLayout>
</template>
<style scoped>
.demo-hint { margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--color-border); display: flex; flex-direction: column; gap: 3px; color: var(--color-text-muted); }
.back-link { margin-top: 10px; color: var(--color-secondary); font-weight: 600; text-decoration: none; font-size: 13px; }
</style>
