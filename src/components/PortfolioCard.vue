<template>
  <div 
    class="portfolio-card" 
    @click="$emit('click')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="card-skeleton">
      <SkeletonLoader type="image" />
      <div class="skeleton-content">
        <SkeletonLoader type="title" />
        <SkeletonLoader type="text" />
        <SkeletonLoader type="text" width="60%" />
      </div>
    </div>

    <!-- Card Content -->
    <div v-else class="card-content">
      <!-- Thumbnail -->
      <div class="card-thumbnail">
        <img v-if="thumbnailImage" :src="thumbnailImage" :alt="project.title" />
        <div v-else class="thumbnail-placeholder">
          <img v-if="isIconImage" :src="project.icon" :alt="project.title" class="icon-image" />
          <span v-else>{{ project.icon || '🎮' }}</span>
        </div>
        
        <!-- Hover Overlay -->
        <div class="card-overlay" :class="{ 'overlay-active': isHovered }">
          <div class="overlay-content">
            <span class="overlay-text">ดูรายละเอียดเพิ่มเติม</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card Info -->
      <div class="card-info">
        <h3 class="card-title">{{ project.title }}</h3>
        <p class="card-description">{{ project.description }}</p>
        <div class="card-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SkeletonLoader from './SkeletonLoader.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const isLoading = ref(true)
const isHovered = ref(false)

// Get first image from images array as thumbnail
const thumbnailImage = computed(() => {
  if (props.project.images && props.project.images.length > 0) {
    return props.project.images[0]
  }
  return null
})

// Check if icon is an image path (starts with / or http)
const isIconImage = computed(() => {
  const icon = props.project.icon
  if (!icon) return false
  return icon.startsWith('/') || icon.startsWith('http') || icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.webp')
})

// Simulate loading for skeleton effect
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800 + Math.random() * 500) // Random delay for staggered effect
})
</script>

<style scoped>
.portfolio-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.portfolio-card:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

/* Skeleton State */
.card-skeleton {
  padding: 16px;
}

.skeleton-content {
  padding-top: 16px;
}

/* Card Content */
.card-content {
  display: flex;
  flex-direction: column;
}

/* Thumbnail */
.card-thumbnail {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.portfolio-card:hover .card-thumbnail img {
  transform: scale(1.05);
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
}

.thumbnail-placeholder .icon-image {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

/* Hover Overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.overlay-active {
  opacity: 1;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: white;
  transform: translateY(10px);
  transition: transform var(--transition-normal);
}

.overlay-active .overlay-content {
  transform: translateY(0);
}

.overlay-text {
  font-size: 0.9375rem;
  font-weight: 500;
}

/* Card Info */
.card-info {
  padding: 20px;
}

.card-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent-primary);
  margin-bottom: 8px;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
  transition: color var(--transition-fast);
}

.portfolio-card:hover .card-title {
  color: var(--accent-primary);
}

.card-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--text-tertiary);
}
</style>
