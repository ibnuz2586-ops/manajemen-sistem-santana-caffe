<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/stores/productStore'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import ProductFormModal from '@/components/features/ProductFormModal.vue'

const productStore = useProductStore()
const isModalOpen = ref(false)
const editingProduct = ref(null)
const feedbackMsg = ref('')

const columns = [
  { key: 'code', label: 'Kode' },
  { key: 'name', label: 'Nama Menu' },
  { key: 'category', label: 'Kategori' },
  { key: 'price', label: 'Harga' },
  { key: 'stock', label: 'Stok' },
  { key: 'isAvailable', label: 'Status' }
]

function openCreateModal() { editingProduct.value = null; isModalOpen.value = true }
function openEditModal(product) { editingProduct.value = { ...product }; isModalOpen.value = true }

function handleSaveProduct(formData) {
  if (editingProduct.value) {
    productStore.updateProduct(editingProduct.value.id, formData)
    feedbackMsg.value = `Menu "${formData.name}" berhasil diperbarui.`
  } else {
    productStore.addProduct(formData)
    feedbackMsg.value = `Menu baru "${formData.name}" berhasil ditambahkan.`
  }
  isModalOpen.value = false
  setTimeout(() => (feedbackMsg.value = ''), 3000)
}

function handleDelete(product) {
  if (confirm(`Hapus menu "${product.name}" dari daftar?`)) {
    productStore.deleteProduct(product.id)
    feedbackMsg.value = `Menu "${product.name}" telah dihapus.`
    setTimeout(() => (feedbackMsg.value = ''), 3000)
  }
}

function formatRupiah(val) {
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}
</script>

<template>
  <DashboardLayout>
    <div class="page-header">
      <div>
        <h1>Manajemen Data Menu</h1>
        <p class="page-subtitle">Kelola daftar produk, harga jual, dan stok Santana Caffe</p>
      </div>
      <BaseButton variant="primary" @click="openCreateModal">+ Tambah Menu Baru</BaseButton>
    </div>
    <div v-if="feedbackMsg" class="alert alert-success">{{ feedbackMsg }}</div>
    <div class="card">
      <BaseTable :columns="columns" :rows="productStore.products">
        <template #cell-price="{ row }">{{ formatRupiah(row.price) }}</template>
        <template #cell-isAvailable="{ row }">
          <StatusBadge :status="row.stock > 0 ? 'Tersedia' : 'Habis'" :type="row.stock > 0 ? 'success' : 'danger'" />
        </template>
        <template #actions="{ row }">
          <div style="display: flex; gap: 6px">
            <BaseButton variant="outline" size="sm" @click="openEditModal(row)">Edit</BaseButton>
            <BaseButton variant="danger" size="sm" @click="handleDelete(row)">Hapus</BaseButton>
          </div>
        </template>
      </BaseTable>
    </div>
    <ProductFormModal :is-open="isModalOpen" :edit-data="editingProduct" @close="isModalOpen = false" @submit="handleSaveProduct" />
  </DashboardLayout>
</template>
