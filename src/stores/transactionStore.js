import { defineStore } from 'pinia'
import { ref } from 'vue'
import seedTransactions from '@/seed/transactions.json'
import { useProductStore } from './productStore'

export const useTransactionStore = defineStore('transactions', () => {
  const STORAGE_KEY = 'santana_caffe_transactions'
  const transactions = ref([])

  function initTransactions() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      transactions.value = JSON.parse(saved)
    } else {
      transactions.value = [...seedTransactions]
      syncStorage()
    }
  }

  function syncStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions.value))
  }

  function createTransaction(payload) {
    const productStore = useProductStore()
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const sequence = String(transactions.value.length + 1).padStart(3, '0')
    const newTrx = {
      id: `trx-${Date.now()}`,
      invoiceNumber: `INV-${today}-${sequence}`,
      customerName: payload.customerName.trim() || 'Pelanggan Umum',
      orderType: payload.orderType,
      tableNumber: payload.orderType === 'Dine-In' ? payload.tableNumber || '-' : '-',
      paymentMethod: payload.paymentMethod,
      cashierName: payload.cashierName,
      items: payload.items,
      totalAmount: Number(payload.totalAmount),
      paidAmount: Number(payload.paidAmount),
      changeAmount: Number(payload.paidAmount) - Number(payload.totalAmount),
      orderStatus: 'Diproses',
      createdAt: new Date().toISOString()
    }
    transactions.value.unshift(newTrx)
    syncStorage()
    productStore.decrementStock(payload.items)
    return newTrx
  }

  function updateOrderStatus(id, status) {
    const trx = transactions.value.find((t) => t.id === id)
    if (trx) {
      trx.orderStatus = status
      syncStorage()
    }
  }

  return { transactions, initTransactions, createTransaction, updateOrderStatus }
})
