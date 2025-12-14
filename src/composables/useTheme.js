import { ref, watch, onMounted } from 'vue'

const theme = ref('dark')

export function useTheme() {
    const setTheme = (newTheme) => {
        theme.value = newTheme
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    const toggleTheme = () => {
        setTheme(theme.value === 'dark' ? 'light' : 'dark')
    }

    const initTheme = () => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
            return
        }

        // Then check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    onMounted(() => {
        initTheme()

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        })
    })

    return {
        theme,
        setTheme,
        toggleTheme,
        initTheme
    }
}
