<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import PublicLayout from '@/layouts/PublicLayout.vue'
import MenuCard from '@/components/features/MenuCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
const productStore = useProductStore(); const searchQuery = ref(''); const selectedCategory = ref('Semua')
const categories = ['Semua', 'Coffee', 'Non-Coffee', 'Pastry', 'Main Course']
const filteredProducts = computed(() => productStore.products.filter((item) => (selectedCategory.value === 'Semua' || item.category === selectedCategory.value) && item.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase())))
</script>
<template>
  <PublicLayout>
    <div class="page-header"><div><h1>Katalog Menu Santana Caffe</h1><p class="page-subtitle">Cek ketersediaan kopi, minuman segar, dan hidangan favorit secara real-time</p></div></div>
    <div class="filter-bar card">
      <div class="search-box"><BaseInput v-model="searchQuery" placeholder="Cari nama menu (contoh: Aren Latte, Croissant)..." /></div>
      <div class="cat-pills"><button v-for="cat in categories" :key="cat" type="button" :class="['pill-btn', { active: selectedCategory === cat }]" @click="selectedCategory = cat">{{ cat }}</button></div>
    </div>
    <div class="grid-3" style="margin-top: 20px"><MenuCard v-for="product in filteredProducts" :key="product.id" :product="product" :show-add-button="false" /></div>
  </PublicLayout>
</template>
<style scoped>
.filter-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.search-box { flex: 1; min-width: 240px; }
.search-box :deep(.form-group) { margin-bottom: 0; }
.cat-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.pill-btn { padding: 7px 14px; border-radius: 999px; border: 1px solid var(--color-border); background: #ffffff; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
.pill-btn.active { background: var(--color-primary); color: #ffffff; border-color: var(--color-primary); }
</style>
