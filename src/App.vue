<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { useTransactionStore } from '@/stores/transactionStore'

const authStore = useAuthStore()
const productStore = useProductStore()
const transactionStore = useTransactionStore()

authStore.initAuth()
productStore.initProducts()
transactionStore.initTransactions()
</script>

<template>
  <RouterView />
</template>
