<template>
  <section id="skills" class="skills-section section">
    <div class="container">
      <div class="section-title">
        <span>ทักษะ</span>
        <h2 ref="titleRef" class="fade-in" :class="{ visible: isTitleVisible }">Technologies</h2>
        <p class="section-subtitle">เทคโนโลยีและเครื่องมือที่ใช้ในการพัฒนา</p>
      </div>

      <!-- Tech Icons -->
      <div class="tech-icons" ref="techRef">
        <div 
          v-for="(tech, index) in technologies" 
          :key="tech.name"
          class="tech-icon fade-in"
          :class="{ visible: isTechVisible }"
          :style="{ animationDelay: `${index * 0.05}s` }"
          :title="tech.name"
        >
          <div class="tech-icon-inner" v-html="tech.icon"></div>
          <span class="tech-name">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '../composables/useParallax'

const { isVisible: isTitleVisible, elementRef: titleRef } = useIntersectionObserver()
const { isVisible: isTechVisible, elementRef: techRef } = useIntersectionObserver()

const technologies = ref([
  { name: 'HTML5', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>` },
  { name: 'CSS3', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573 6.182.003-.36 3.426-2.91.804-2.956-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531l.698-8.157h10.06l-.699 2.819z"/></svg>` },
  { name: 'Tailwind', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#06B6D4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>` },
  { name: 'JavaScript', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#F7DF1E"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>` },
  { name: 'Vue.js', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#4FC08D"><path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78L24 1.61zM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43L12 14.08z"/></svg>` },
  { name: 'Git', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#F05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>` },
  { name: 'Figma', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#F24E1E" d="M8.148 24c2.476 0 4.49-2.014 4.49-4.49v-4.49H8.148c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.49 4.49 4.49z"/><path fill="#FF7262" d="M3.658 10.53c0-2.476 2.014-4.49 4.49-4.49h4.49v8.98h-4.49c-2.476 0-4.49-2.014-4.49-4.49z"/><path fill="#F24E1E" d="M3.658 4.49C3.658 2.014 5.672 0 8.148 0h4.49v8.98h-4.49c-2.476 0-4.49-2.014-4.49-4.49z"/><path fill="#A259FF" d="M12.638 0h4.49c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49h-4.49V0z"/><path fill="#1ABCFE" d="M21.618 10.53c0 2.476-2.014 4.49-4.49 4.49s-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49z"/></svg>` },
  { name: 'Photoshop', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#31A8FF"><path d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01-.2-.01-.34 0-.41.01v3.36c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.6-.23-.85-.16-.25-.39-.45-.67-.59l-.03-.02zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.72 11.67c-.44.45-.98.77-1.57.95-.63.18-1.29.27-1.99.27-.15 0-.34 0-.57-.01-.23-.01-.43-.01-.63-.02v3.16c.01.04-.02.08-.06.09H5.54c-.04 0-.07-.03-.07-.08V6.32c0-.04.01-.08.05-.09.37-.05.93-.1 1.63-.15.71-.05 1.42-.07 2.16-.08.6 0 1.16.08 1.68.24.45.15.86.37 1.21.67.33.27.58.62.74 1.01.16.38.24.79.24 1.24 0 .78-.17 1.44-.52 1.96l.37.85zM18.99 17.05c-.3.42-.73.74-1.22.91-.54.2-1.2.31-1.98.31-.55 0-1.09-.05-1.6-.16-.44-.08-.87-.23-1.26-.44-.03-.02-.05-.06-.04-.09l.01-.02.41-1.33c.01-.04.05-.06.09-.05.36.15.74.27 1.13.34.37.08.74.13 1.12.13.36 0 .63-.05.83-.16.19-.09.3-.24.3-.47 0-.18-.1-.35-.3-.48-.22-.14-.59-.31-1.12-.52-.52-.2-.97-.41-1.34-.64-.33-.21-.6-.49-.79-.83-.18-.35-.27-.77-.27-1.26 0-.48.12-.93.36-1.34.25-.42.62-.76 1.07-.99.48-.26 1.1-.38 1.85-.38.5 0 .98.04 1.42.13.36.07.7.18 1.03.33.02.01.04.04.04.06V11.6c0 .04-.03.08-.07.08h-.02c-.72-.27-1.48-.42-2.25-.41-.35 0-.61.05-.78.17-.18.11-.27.26-.27.46 0 .18.09.33.28.46.21.14.6.32 1.17.55.57.22 1.04.45 1.38.68.33.22.58.5.75.82.17.35.25.75.25 1.2.01.55-.13 1.05-.43 1.47v-.03z"/></svg>` },
])
</script>

<style scoped>
.skills-section {
  background: var(--bg-secondary);
}

.section-subtitle {
  color: var(--text-secondary);
  max-width: 500px;
  margin: 16px auto 0;
  text-align: center;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
}

/* Tech Icons */
.tech-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.tech-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  cursor: default;
  min-width: 100px;
}

.tech-icon:hover {
  border-color: var(--accent-primary);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.tech-icon-inner {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-icon-inner svg {
  width: 40px;
  height: 40px;
}

.tech-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-icon {
    min-width: 80px;
    padding: 16px;
  }
}
</style>
