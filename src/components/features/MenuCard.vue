<script setup>
import StatusBadge from '@/components/common/StatusBadge.vue'
import BaseButton from '@/components/common/BaseButton.vue'
defineProps({ product: { type: Object, required: true }, showAddButton: { type: Boolean, default: false } })
defineEmits(['add-to-cart'])
function formatRupiah(val) { return 'Rp ' + Number(val).toLocaleString('id-ID') }
</script>
<template>
  <div class="menu-card">
    <div class="menu-top">
      <span class="category-tag">{{ product.category }}</span>
      <StatusBadge :status="product.stock > 0 ? 'Tersedia' : 'Habis'" :type="product.stock > 0 ? 'success' : 'danger'" />
    </div>
    <div class="menu-body">
      <small class="menu-code">{{ product.code }}</small>
      <h3 class="menu-title">{{ product.name }}</h3>
      <p class="menu-price">{{ formatRupiah(product.price) }}</p>
      <small class="menu-stock">Sisa Stok: {{ product.stock }} porsi</small>
    </div>
    <div v-if="showAddButton" class="menu-footer">
      <BaseButton variant="secondary" size="sm" block :disabled="product.stock <= 0" @click="$emit('add-to-cart', product)">
        {{ product.stock > 0 ? '+ Tambah ke Keranjang' : 'Stok Habis' }}
      </BaseButton>
    </div>
  </div>
</template>
<style scoped>
.menu-card { background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; }
.menu-top { display: flex; justify-content: space-between; align-items: center; }
.category-tag { font-size: 11px; font-weight: 600; color: var(--color-secondary); background: var(--color-secondary-light); padding: 3px 8px; border-radius: 6px; }
.menu-code { color: var(--color-text-muted); font-size: 11px; }
.menu-title { font-size: 15px; margin: 2px 0 6px; color: var(--color-primary); }
.menu-price { font-weight: 700; font-size: 15px; color: var(--color-text); }
.menu-stock { color: var(--color-text-muted); font-size: 12px; }
</style>
