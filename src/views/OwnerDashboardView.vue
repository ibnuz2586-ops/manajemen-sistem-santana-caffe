<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useTransactionStore } from '@/stores/transactionStore'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const productStore = useProductStore()
const transactionStore = useTransactionStore()

const totalRevenue = computed(() =>
  transactionStore.transactions.filter((t) => t.orderStatus !== 'Dibatalkan').reduce((sum, t) => sum + t.totalAmount, 0)
)
const totalOrders = computed(() => transactionStore.transactions.length)
const lowStockCount = computed(() => productStore.products.filter((p) => p.stock <= 5).length)

const columns = [
  { key: 'invoiceNumber', label: 'No. Invoice' },
  { key: 'customerName', label: 'Pelanggan' },
  { key: 'orderType', label: 'Tipe' },
  { key: 'totalAmount', label: 'Total' },
  { key: 'orderStatus', label: 'Status' }
]

function formatRupiah(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}
</script>

<template>
  <DashboardLayout>
    <div class="page-header">
      <div>
        <h1>Ringkasan Pendapatan Santana Caffe</h1>
        <p class="page-subtitle">Pantau performa penjualan dan ketersediaan menu secara langsung</p>
      </div>
    </div>
    <div class="grid-3" style="margin-bottom: 22px">
      <div class="card stat-card"><small>Total Pendapatan Tercatat</small><h2>{{ formatRupiah(totalRevenue) }}</h2></div>
      <div class="card stat-card"><small>Total Transaksi</small><h2>{{ totalOrders }} Pesanan</h2></div>
      <div class="card stat-card"><small>Menu Stok Menipis / Habis (≤ 5)</small><h2>{{ lowStockCount }} Menu</h2></div>
    </div>
    <div class="card">
      <h2 style="margin-bottom: 14px">Transaksi Terbaru</h2>
      <BaseTable :columns="columns" :rows="transactionStore.transactions.slice(0, 8)">
        <template #cell-totalAmount="{ row }"><strong>{{ formatRupiah(row.totalAmount) }}</strong></template>
        <template #cell-orderStatus="{ row }">
          <StatusBadge :status="row.orderStatus" :type="row.orderStatus === 'Selesai' ? 'success' : 'warning'" />
        </template>
      </BaseTable>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.stat-card small { color: var(--color-text-muted); font-weight: 600; }
.stat-card h2 { font-size: 22px; margin-top: 6px; }
</style>
