<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
const props = defineProps({ isOpen: { type: Boolean, default: false }, transaction: { type: Object, default: null } })
defineEmits(['close'])
const copied = ref(false)
function formatRupiah(val) { return 'Rp ' + Number(val).toLocaleString('id-ID') }
function copyInvoice() {
  if (!props.transaction) return
  navigator.clipboard?.writeText(props.transaction.invoiceNumber)
  copied.value = true; setTimeout(() => (copied.value = false), 2000)
}
</script>
<template>
  <BaseModal :is-open="isOpen" title="Struk Transaksi Digital" max-width="400px" @close="$emit('close')">
    <div v-if="transaction" class="receipt-paper">
      <div class="receipt-header"><h3>SANTANA CAFFE</h3><small>Jl. Arifin Ahmad No. 45, Pekanbaru</small></div>
      <div class="receipt-meta">
        <div><span>No. Invoice:</span><strong>{{ transaction.invoiceNumber }}</strong></div>
        <div><span>Pelanggan:</span><span>{{ transaction.customerName }} ({{ transaction.orderType }})</span></div>
        <div><span>Kasir:</span><span>{{ transaction.cashierName }}</span></div>
        <div><span>Metode:</span><span>{{ transaction.paymentMethod }}</span></div>
      </div>
      <div class="receipt-items">
        <div v-for="(item, idx) in transaction.items" :key="idx" class="r-item">
          <div><div>{{ item.productName }}</div><small>{{ item.qty }} × {{ formatRupiah(item.unitPrice) }}</small></div>
          <strong>{{ formatRupiah(item.subtotal) }}</strong>
        </div>
      </div>
      <div class="receipt-totals">
        <div class="r-line"><span>Total Tagihan</span><strong>{{ formatRupiah(transaction.totalAmount) }}</strong></div>
        <div class="r-line"><span>Dibayar</span><span>{{ formatRupiah(transaction.paidAmount) }}</span></div>
        <div class="r-line"><span>Kembalian</span><strong>{{ formatRupiah(transaction.changeAmount) }}</strong></div>
      </div>
      <p class="receipt-thanks">Terima kasih telah berkunjung ke Santana Caffe!</p>
      <div class="receipt-actions">
        <BaseButton variant="outline" size="sm" @click="copyInvoice">{{ copied ? 'Kode Tersalin!' : 'Salin No. Invoice' }}</BaseButton>
        <BaseButton variant="primary" size="sm" @click="$emit('close')">Selesai</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
<style scoped>
.receipt-paper { font-size: 13px; }
.receipt-header { text-align: center; padding-bottom: 12px; border-bottom: 1px dashed var(--color-border); }
.receipt-meta, .receipt-items, .receipt-totals { padding: 12px 0; border-bottom: 1px dashed var(--color-border); }
.receipt-meta > div, .r-item, .r-line { display: flex; justify-content: space-between; margin-bottom: 6px; }
.receipt-thanks { text-align: center; color: var(--color-text-muted); margin: 14px 0; font-size: 12px; }
.receipt-actions { display: flex; justify-content: space-between; gap: 8px; }
</style>
