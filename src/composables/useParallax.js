import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(speed = 0.5) {
    const offset = ref(0)
    let ticking = false

    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                offset.value = window.scrollY * speed
                ticking = false
            })
            ticking = true
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return { offset }
}

export function useIntersectionObserver(options = {}) {
    const isVisible = ref(false)
    const elementRef = ref(null)
    let observer = null

    // Default: once = false so animations replay on scroll
    const once = options.once !== undefined ? options.once : false

    const defaultOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
        ...options
    }

    onMounted(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true
                    // Only stop observing if once = true
                    if (once) {
                        observer.unobserve(entry.target)
                    }
                } else if (!once) {
                    // Reset visibility when scrolling away (for replay)
                    isVisible.value = false
                }
            })
        }, defaultOptions)

        if (elementRef.value) {
            observer.observe(elementRef.value)
        }
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
        }
    })

    return { isVisible, elementRef }
}
