<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { useTransactionStore } from '@/stores/transactionStore'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import MenuCard from '@/components/features/MenuCard.vue'
import CartPanel from '@/components/features/CartPanel.vue'
import ReceiptModal from '@/components/features/ReceiptModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'

const authStore = useAuthStore()
const productStore = useProductStore()
const transactionStore = useTransactionStore()

const search = ref('')
const cart = ref([])
const stockWarning = ref('')
const lastTransaction = ref(null)
const isReceiptOpen = ref(false)

const filteredProducts = computed(() =>
  productStore.products.filter((p) => p.name.toLowerCase().includes(search.value.trim().toLowerCase()))
)

function addToCart(product) {
  stockWarning.value = ''
  if (product.stock <= 0) return
  const existing = cart.value.find((c) => c.productId === product.id)
  if (existing) {
    if (existing.qty >= product.stock) {
      stockWarning.value = `Stok "${product.name}" hanya tersisa ${product.stock} porsi.`
      return
    }
    existing.qty += 1
  } else {
    cart.value.push({ productId: product.id, productName: product.name, unitPrice: product.price, qty: 1 })
  }
}

function incrementQty(productId) {
  stockWarning.value = ''
  const product = productStore.products.find((p) => p.id === productId)
  const item = cart.value.find((c) => c.productId === productId)
  if (item && product) {
    if (item.qty >= product.stock) { stockWarning.value = `Jumlah pesanan melebihi batas stok (${product.stock}).`; return }
    item.qty += 1
  }
}

function decrementQty(productId) {
  const index = cart.value.findIndex((c) => c.productId === productId)
  if (index !== -1) {
    if (cart.value[index].qty > 1) { cart.value[index].qty -= 1 } else { cart.value.splice(index, 1) }
  }
}

function removeFromCart(productId) {
  cart.value = cart.value.filter((c) => c.productId !== productId)
}

function handleCheckout(checkoutPayload) {
  const created = transactionStore.createTransaction(checkoutPayload)
  lastTransaction.value = created
  isReceiptOpen.value = true
  cart.value = []
}
</script>

<template>
  <DashboardLayout>
    <div class="page-header">
      <div>
        <h1>Transaksi Kasir (Point of Sale)</h1>
        <p class="page-subtitle">Pilih menu pesanan pelanggan dan cetak nota pembayaran</p>
      </div>
    </div>
    <div v-if="stockWarning" class="alert alert-warning">{{ stockWarning }}</div>
    <div class="pos-grid">
      <div>
        <BaseInput v-model="search" placeholder="Cari menu di kasir..." />
        <div class="grid-2">
          <MenuCard v-for="product in filteredProducts" :key="product.id" :product="product" :show-add-button="true" @add-to-cart="addToCart" />
        </div>
      </div>
      <div>
        <CartPanel :cart="cart" :cashier-name="authStore.currentUser?.name" @increment="incrementQty" @decrement="decrementQty" @remove="removeFromCart" @checkout="handleCheckout" />
      </div>
    </div>
    <ReceiptModal :is-open="isReceiptOpen" :transaction="lastTransaction" @close="isReceiptOpen = false" />
  </DashboardLayout>
</template>

<style scoped>
.pos-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; align-items: start; }
@media (max-width: 960px) { .pos-grid { grid-template-columns: 1fr; } }
</style>
