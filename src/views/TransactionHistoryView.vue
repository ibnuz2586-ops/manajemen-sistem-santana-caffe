<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import ReceiptModal from '@/components/features/ReceiptModal.vue'

const transactionStore = useTransactionStore()
const selectedTrx = ref(null)
const isReceiptOpen = ref(false)

const columns = [
  { key: 'invoiceNumber', label: 'No. Invoice' },
  { key: 'customerName', label: 'Pelanggan' },
  { key: 'orderType', label: 'Tipe' },
  { key: 'totalAmount', label: 'Total' },
  { key: 'orderStatus', label: 'Status Pesanan' }
]

function markDone(id) { transactionStore.updateOrderStatus(id, 'Selesai') }
function viewReceipt(row) { selectedTrx.value = row; isReceiptOpen.value = true }
function formatRupiah(val) { return 'Rp ' + Number(val).toLocaleString('id-ID') }
</script>

<template>
  <DashboardLayout>
    <div class="page-header">
      <div>
        <h1>Riwayat & Status Transaksi</h1>
        <p class="page-subtitle">Perbarui status pesanan selesai dan lihat kembali nota transaksi</p>
      </div>
    </div>
    <div class="card">
      <BaseTable :columns="columns" :rows="transactionStore.transactions">
        <template #cell-totalAmount="{ row }"><strong>{{ formatRupiah(row.totalAmount) }}</strong></template>
        <template #cell-orderStatus="{ row }">
          <StatusBadge :status="row.orderStatus" :type="row.orderStatus === 'Selesai' ? 'success' : 'warning'" />
        </template>
        <template #actions="{ row }">
          <div style="display: flex; gap: 6px">
            <BaseButton v-if="row.orderStatus === 'Diproses'" variant="secondary" size="sm" @click="markDone(row.id)">Tandai Selesai</BaseButton>
            <BaseButton variant="outline" size="sm" @click="viewReceipt(row)">Lihat Struk</BaseButton>
          </div>
        </template>
      </BaseTable>
    </div>
    <ReceiptModal :is-open="isReceiptOpen" :transaction="selectedTrx" @close="isReceiptOpen = false" />
  </DashboardLayout>
</template>
