import { defineStore } from 'pinia'
import { ref } from 'vue'
import seedProducts from '@/seed/products.json'

export const useProductStore = defineStore('products', () => {
  const STORAGE_KEY = 'santana_caffe_products'
  const products = ref([])

  function initProducts() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      products.value = JSON.parse(saved)
    } else {
      products.value = [...seedProducts]
      syncStorage()
    }
  }

  function syncStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products.value))
  }

  function addProduct(payload) {
    const stockNum = Number(payload.stock)
    products.value.unshift({
      id: `prd-${Date.now()}`,
      code: payload.code.trim().toUpperCase(),
      name: payload.name.trim(),
      category: payload.category,
      price: Number(payload.price),
      stock: stockNum,
      isAvailable: stockNum > 0
    })
    syncStorage()
  }

  function updateProduct(id, payload) {
    const index = products.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      const stockNum = Number(payload.stock)
      products.value[index] = {
        ...products.value[index],
        code: payload.code.trim().toUpperCase(),
        name: payload.name.trim(),
        category: payload.category,
        price: Number(payload.price),
        stock: stockNum,
        isAvailable: stockNum > 0
      }
      syncStorage()
    }
  }

  function deleteProduct(id) {
    products.value = products.value.filter((p) => p.id !== id)
    syncStorage()
  }

  function decrementStock(items) {
    items.forEach((item) => {
      const target = products.value.find((p) => p.id === item.productId)
      if (target) {
        target.stock = Math.max(0, target.stock - item.qty)
        target.isAvailable = target.stock > 0
      }
    })
    syncStorage()
  }

  return { products, initProducts, addProduct, updateProduct, deleteProduct, decrementStock }
})
