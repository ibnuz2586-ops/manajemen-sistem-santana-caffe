<script setup>
import { reactive, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
const props = defineProps({ isOpen: { type: Boolean, default: false }, editData: { type: Object, default: null } })
const emit = defineEmits(['close', 'submit'])
const form = reactive({ code: '', name: '', category: 'Coffee', price: '', stock: '' })
const errors = reactive({ code: '', name: '', price: '', stock: '' })
watch(() => props.isOpen, (open) => {
  if (open) {
    errors.code = ''; errors.name = ''; errors.price = ''; errors.stock = ''
    if (props.editData) { Object.assign(form, props.editData) } else { form.code = ''; form.name = ''; form.category = 'Coffee'; form.price = ''; form.stock = '' }
  }
})
function validateAndSubmit() {
  errors.code = ''; errors.name = ''; errors.price = ''; errors.stock = ''
  let valid = true
  if (!form.code.trim()) { errors.code = 'Kode menu wajib diisi'; valid = false }
  if (!form.name.trim()) { errors.name = 'Nama menu wajib diisi'; valid = false }
  if (form.price === '' || Number(form.price) <= 0) { errors.price = 'Harga menu harus lebih besar dari Rp 0'; valid = false }
  if (form.stock === '' || Number(form.stock) < 0) { errors.stock = 'Stok menu tidak boleh kurang dari 0'; valid = false }
  if (!valid) return
  emit('submit', { code: form.code, name: form.name, category: form.category, price: Number(form.price), stock: Number(form.stock) })
}
</script>
<template>
  <BaseModal :is-open="isOpen" :title="editData ? 'Ubah Data Menu Santana Caffe' : 'Tambah Menu Baru'" @close="$emit('close')">
    <form @submit.prevent="validateAndSubmit">
      <BaseInput v-model="form.code" label="Kode Menu" placeholder="Contoh: M-009" :error-message="errors.code" required />
      <BaseInput v-model="form.name" label="Nama Menu" placeholder="Contoh: Matcha Espresso Fusion" :error-message="errors.name" required />
      <div class="select-group"><label class="form-label">Kategori Menu *</label><select v-model="form.category" class="select-control"><option value="Coffee">Coffee</option><option value="Non-Coffee">Non-Coffee</option><option value="Pastry">Pastry</option><option value="Main Course">Main Course</option></select></div>
      <BaseInput v-model="form.price" type="number" label="Harga Jual (Rp)" placeholder="28000" :error-message="errors.price" required />
      <BaseInput v-model="form.stock" type="number" label="Jumlah Stok Tersedia" placeholder="25" :error-message="errors.stock" required />
      <div class="modal-actions"><BaseButton variant="outline" @click="$emit('close')">Batal</BaseButton><BaseButton type="submit" variant="primary">Simpan Menu</BaseButton></div>
    </form>
  </BaseModal>
</template>
<style scoped>
.select-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
.form-label { font-size: 12px; font-weight: 600; }
.select-control { padding: 9px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-family: inherit; font-size: 13px; background: #ffffff; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
</style>
