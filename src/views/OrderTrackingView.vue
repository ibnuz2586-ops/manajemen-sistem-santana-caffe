<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
const transactionStore = useTransactionStore(); const invoiceInput = ref(''); const foundOrder = ref(null); const notFound = ref(false)
function searchOrder() {
  notFound.value = false; foundOrder.value = null
  const query = invoiceInput.value.trim().toLowerCase()
  if (!query) { notFound.value = true; return }
  const match = transactionStore.transactions.find((t) => t.invoiceNumber.toLowerCase() === query)
  if (match) { foundOrder.value = match } else { notFound.value = true }
}
function getBadgeType(s) { return s === 'Selesai' ? 'success' : s === 'Dibatalkan' ? 'danger' : 'warning' }
function formatRupiah(val) { return 'Rp ' + Number(val).toLocaleString('id-ID') }
</script>
<template>
  <PublicLayout>
    <div class="track-container">
      <div class="card">
        <h1>Lacak Status Pesanan</h1><p class="page-subtitle">Masukkan nomor invoice pada struk Anda untuk memantau proses pembuatan pesanan</p>
        <form class="search-row" @submit.prevent="searchOrder"><div style="flex: 1"><BaseInput v-model="invoiceInput" placeholder="Contoh: INV-20261117-001" /></div><BaseButton type="submit" variant="primary">Cek Status</BaseButton></form>
        <div v-if="notFound" class="alert alert-danger">Nomor pesanan tidak ditemukan. Periksa kembali kode invoice pada struk Anda.</div>
        <div v-if="foundOrder" class="result-card">
          <div class="result-top"><div><small>Nomor Invoice</small><h2>{{ foundOrder.invoiceNumber }}</h2></div><StatusBadge :status="foundOrder.orderStatus" :type="getBadgeType(foundOrder.orderStatus)" /></div>
          <p class="meta-line">Pemesan: <strong>{{ foundOrder.customerName }}</strong> • Tipe: <strong>{{ foundOrder.orderType }}</strong></p>
          <div class="item-list"><div v-for="(item, idx) in foundOrder.items" :key="idx" class="item-row"><span>{{ item.qty }}× {{ item.productName }}</span><strong>{{ formatRupiah(item.subtotal) }}</strong></div></div>
          <div class="total-row"><span>Total Pembayaran</span><strong>{{ formatRupiah(foundOrder.totalAmount) }}</strong></div>
        </div>
      </div>
    </div>
  </PublicLayout>
</template>
<style scoped>
.track-container { max-width: 620px; margin: 0 auto; }
.search-row { display: flex; gap: 10px; align-items: flex-start; margin-top: 18px; }
.result-card { margin-top: 16px; padding: 18px; background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.result-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.meta-line { color: var(--color-text-muted); margin-bottom: 12px; }
.item-list { border-top: 1px dashed var(--color-border); border-bottom: 1px dashed var(--color-border); padding: 10px 0; margin-bottom: 10px; }
.item-row, .total-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
</style>
