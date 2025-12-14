<template>
  <section id="home" class="hero-section" ref="heroRef">
    <!-- Animated Background Glows -->
    <div class="hero-glows">
      <div class="glow glow-purple" :style="{ transform: `translate(${offset * 0.3}px, ${offset * 0.1}px)` }"></div>
      <div class="glow glow-blue" :style="{ transform: `translate(-${offset * 0.2}px, ${offset * 0.15}px)` }"></div>
      <div class="glow glow-pink" :style="{ transform: `translate(${offset * 0.1}px, -${offset * 0.1}px)` }"></div>
    </div>

    <div class="container hero-container">
      <div class="hero-content">
        <!-- Main Title -->
        <h1 class="hero-title fade-in fade-in-delay-1" :class="{ visible: isVisible }">
          <span class="gradient-text">RAGERES</span>
        </h1>

        <!-- Typing Effect Role -->
        <div class="hero-role fade-in fade-in-delay-2" :class="{ visible: isVisible }">
          <span>I'm a </span>
          <span class="typing-text">{{ displayText }}<span class="cursor">|</span></span>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-actions fade-in fade-in-delay-3" :class="{ visible: isVisible }">
          <a href="#portfolio" class="btn btn-primary">
            <span>ดูผลงาน</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/resume_rageres.pdf" download class="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useParallax, useIntersectionObserver } from '../composables/useParallax'

const { offset } = useParallax(0.5)
const { isVisible, elementRef: heroRef } = useIntersectionObserver()

// Typing effect
const roles = ['UX / UI Developer', 'Frontend Developer']
const displayText = ref('')
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typingInterval = null

const typeEffect = () => {
  const currentRole = roles[roleIndex]
  
  if (isDeleting) {
    displayText.value = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    displayText.value = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  // Speed control
  let speed = isDeleting ? 50 : 100

  // If word is complete
  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000 // Pause at end
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    speed = 500 // Pause before next word
  }

  typingInterval = setTimeout(typeEffect, speed)
}

onMounted(() => {
  typeEffect()
})

onUnmounted(() => {
  if (typingInterval) {
    clearTimeout(typingInterval)
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 80px;
}

.hero-glows {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-glows .glow {
  position: absolute;
}

.hero-glows .glow-purple {
  top: 10%;
  right: 10%;
  width: 500px;
  height: 500px;
}

.hero-glows .glow-blue {
  bottom: 20%;
  left: 5%;
  width: 400px;
  height: 400px;
}

.hero-glows .glow-pink {
  top: 40%;
  left: 30%;
  width: 300px;
  height: 300px;
}

.hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 800px;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 16px;
}

.hero-title .gradient-text {
  font-family: 'Gloock', serif;
}

.hero-role {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--text-secondary);
  margin-bottom: 40px;
  min-height: 2em;
}

.typing-text {
  color: var(--accent-primary);
  font-weight: 500;
}

.cursor {
  color: var(--accent-primary);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);
}
/* Responsive */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
  }

  .hero-stats {
    flex-wrap: wrap;
  }
}
</style>
