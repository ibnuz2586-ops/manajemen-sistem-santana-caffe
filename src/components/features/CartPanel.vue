<script setup>
import { ref, computed } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
const props = defineProps({ cart: { type: Array, default: () => [] }, cashierName: { type: String, default: 'Kasir' } })
const emit = defineEmits(['increment', 'decrement', 'remove', 'checkout'])
const customerName = ref(''); const orderType = ref('Dine-In'); const tableNumber = ref(''); const paymentMethod = ref('Tunai'); const paidAmount = ref(''); const errorMsg = ref('')
const totalAmount = computed(() => props.cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0))
const changeAmount = computed(() => { const paid = Number(paidAmount.value) || 0; return paid >= totalAmount.value ? paid - totalAmount.value : 0 })
function formatRupiah(val) { return 'Rp ' + Number(val).toLocaleString('id-ID') }
function handleCheckout() {
  errorMsg.value = ''
  if (!props.cart.length) { errorMsg.value = 'Keranjang pesanan masih kosong!'; return }
  const paid = Number(paidAmount.value)
  if (!paid || paid < totalAmount.value) { errorMsg.value = 'Nominal pembayaran kurang dari total tagihan!'; return }
  emit('checkout', { customerName: customerName.value || 'Pelanggan Umum', orderType: orderType.value, tableNumber: tableNumber.value, paymentMethod: paymentMethod.value, cashierName: props.cashierName, items: props.cart.map((i) => ({ productId: i.productId, productName: i.productName, qty: i.qty, unitPrice: i.unitPrice, subtotal: i.unitPrice * i.qty })), totalAmount: totalAmount.value, paidAmount: paid })
  customerName.value = ''; tableNumber.value = ''; paidAmount.value = ''
}
</script>
<template>
  <div class="card cart-panel">
    <h2>Keranjang Pesanan</h2><p class="page-subtitle">Kasir aktif: {{ cashierName }}</p>
    <div v-if="errorMsg" class="alert alert-danger" style="margin-top: 10px">{{ errorMsg }}</div>
    <div class="cart-items">
      <p v-if="!cart.length" class="empty-cart">Belum ada menu dipilih.</p>
      <div v-for="item in cart" :key="item.productId" class="cart-row">
        <div class="cart-info"><strong>{{ item.productName }}</strong><small>{{ formatRupiah(item.unitPrice) }} × {{ item.qty }}</small></div>
        <div class="cart-controls">
          <button type="button" class="qty-btn" @click="$emit('decrement', item.productId)">-</button>
          <span class="qty-val">{{ item.qty }}</span>
          <button type="button" class="qty-btn" @click="$emit('increment', item.productId)">+</button>
          <button type="button" class="del-btn" @click="$emit('remove', item.productId)">✕</button>
        </div>
      </div>
    </div>
    <BaseInput v-model="customerName" label="Nama Pelanggan" placeholder="Contoh: Raka Pratama" />
    <div class="form-row-2">
      <div class="select-group"><label>Tipe Pesanan</label><select v-model="orderType" class="select-control"><option value="Dine-In">Dine-In</option><option value="Takeaway">Takeaway</option></select></div>
      <BaseInput v-if="orderType === 'Dine-In'" v-model="tableNumber" label="Nomor Meja" placeholder="04" />
    </div>
    <div class="select-group"><label>Metode Pembayaran</label><select v-model="paymentMethod" class="select-control"><option value="Tunai">Tunai (Cash)</option><option value="QRIS">QRIS Santana Caffe</option></select></div>
    <BaseInput v-model="paidAmount" type="number" label="Nominal Bayar (Rp)" placeholder="Masukkan uang diterima" :min="0" />
    <div class="summary-box">
      <div class="sum-line"><span>Total Tagihan</span><strong>{{ formatRupiah(totalAmount) }}</strong></div>
      <div class="sum-line change-line"><span>Kembalian</span><strong>{{ formatRupiah(changeAmount) }}</strong></div>
    </div>
    <BaseButton variant="primary" size="lg" block :disabled="!cart.length" @click="handleCheckout">Proses Pembayaran & Cetak Struk</BaseButton>
  </div>
</template>
<style scoped>
.cart-items { margin: 14px 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 12px 0; max-height: 240px; overflow-y: auto; }
.empty-cart { text-align: center; color: var(--color-text-muted); padding: 18px 0; }
.cart-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px dashed var(--color-border); }
.cart-info { display: flex; flex-direction: column; }
.cart-info small { color: var(--color-text-muted); }
.cart-controls { display: flex; align-items: center; gap: 6px; }
.qty-btn { width: 24px; height: 24px; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-bg); cursor: pointer; font-weight: 700; }
.qty-val { min-width: 18px; text-align: center; font-weight: 600; }
.del-btn { background: none; border: none; color: var(--color-danger); cursor: pointer; margin-left: 4px; }
.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.select-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
.select-group label { font-size: 12px; font-weight: 600; }
.select-control { padding: 9px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-family: inherit; font-size: 13px; background: #ffffff; }
.summary-box { background: var(--color-bg); padding: 12px; border-radius: 8px; margin-bottom: 14px; }
.sum-line { display: flex; justify-content: space-between; margin-bottom: 4px; }
.change-line { color: var(--color-success); font-size: 15px; margin-bottom: 0; }
</style>
