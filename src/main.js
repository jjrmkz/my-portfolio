import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'

// Initialize theme from localStorage or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark'
document.documentElement.setAttribute('data-theme', savedTheme)

createApp(App).mount('#app')
