import { defineStore } from 'pinia'
import { ref } from 'vue'
import seedUsers from '@/seed/users.json'

export const useAuthStore = defineStore('auth', () => {
  const USERS_KEY = 'santana_caffe_users'
  const SESSION_KEY = 'santana_caffe_session'
  const users = ref([])
  const currentUser = ref(null)

  function initAuth() {
    const savedUsers = localStorage.getItem(USERS_KEY)
    if (savedUsers) {
      users.value = JSON.parse(savedUsers)
    } else {
      users.value = [...seedUsers]
      localStorage.setItem(USERS_KEY, JSON.stringify(users.value))
    }
    const savedSession = localStorage.getItem(SESSION_KEY)
    if (savedSession) currentUser.value = JSON.parse(savedSession)
  }

  function login(username, password) {
    if (!users.value.length) initAuth()
    if (!username || !password) return { success: false, message: 'Username dan kata sandi wajib diisi.' }
    const matched = users.value.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    )
    if (!matched) return { success: false, message: 'Kredensial salah! Periksa kembali username atau kata sandi.' }
    const sessionData = { id: matched.id, name: matched.name, username: matched.username, role: matched.role }
    currentUser.value = sessionData
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
    return { success: true, user: sessionData }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  return { users, currentUser, initAuth, login, logout }
})
