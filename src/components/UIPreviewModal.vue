<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-section">
            <h3>{{ project.title }}</h3>
          </div>
          <button class="modal-close" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Image Gallery Preview -->
        <div class="modal-preview">
          <div class="preview-frame" v-if="hasImages">
            <!-- Main Image Display -->
            <img 
              :src="currentImage" 
              :alt="project.title"
              class="preview-image"
              @click="toggleZoom"
            />
            
            <!-- Navigation Arrows (show only if multiple images) -->
            <template v-if="project.images.length > 1">
              <button class="nav-arrow nav-prev" @click.stop="prevImage">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button class="nav-arrow nav-next" @click.stop="nextImage">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </template>

            <!-- Image Counter -->
            <div class="image-counter" v-if="project.images.length > 1">
              {{ currentIndex + 1 }} / {{ project.images.length }}
            </div>

            <!-- Zoom Hint -->
            <div class="zoom-hint">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              คลิกเพื่อซูม
            </div>
          </div>

          <!-- No Image State -->
          <div v-else class="preview-frame no-image-frame">
            <div class="no-image">
              <span class="no-image-icon">{{ project.icon || '🖼️' }}</span>
              <span class="no-image-text">ไม่มีรูปภาพ</span>
            </div>
          </div>
        </div>

        <!-- Zoom Overlay -->
        <div class="zoom-overlay" v-if="isZoomed" @click="toggleZoom">
          <img :src="currentImage" :alt="project.title" class="zoomed-image" />
          <div class="zoom-close-hint">คลิกเพื่อปิด</div>
        </div>

        <!-- Thumbnail Strip (show only if multiple images) -->
        <div class="thumbnail-strip" v-if="project.images && project.images.length > 1">
          <button 
            v-for="(img, index) in project.images" 
            :key="index"
            class="thumbnail-item"
            :class="{ active: currentIndex === index }"
            @click="currentIndex = index"
          >
            <img :src="img" :alt="`${project.title} ${index + 1}`" />
          </button>
        </div>

        <!-- Modal Footer with Project Info -->
        <div class="modal-footer">
          <div class="footer-content">
            <div class="project-info">
              <p>{{ project.description }}</p>
              
              <!-- Features List -->
              <div class="project-features" v-if="project.features && project.features.length > 0">
                <ul class="features-list">
                  <li v-for="(feature, index) in project.features" :key="index">
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>

            <!-- Copyright -->
            <div class="project-copyright" v-if="project.copyright">
              <span class="copyright-text">{{ project.copyright }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    default: () => ({
      title: 'UI Preview',
      category: 'FiveM UI',
      description: '',
      tags: [],
      icon: '🖼️',
      images: []
    })
  }
})

const emit = defineEmits(['close'])
const currentIndex = ref(0)
const isZoomed = ref(false)

const hasImages = computed(() => {
  return props.project.images && props.project.images.length > 0
})

const currentImage = computed(() => {
  if (!hasImages.value) return null
  return props.project.images[currentIndex.value]
})

const nextImage = () => {
  if (!hasImages.value) return
  currentIndex.value = (currentIndex.value + 1) % props.project.images.length
}

const prevImage = () => {
  if (!hasImages.value) return
  currentIndex.value = currentIndex.value === 0 
    ? props.project.images.length - 1 
    : currentIndex.value - 1
}

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
}

const closeModal = () => {
  isZoomed.value = false
  emit('close')
}

// Reset to first image when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    currentIndex.value = 0
  } else {
    document.body.style.overflow = ''
  }
})

// Reset index when project changes
watch(() => props.project, () => {
  currentIndex.value = 0
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.9);
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-container {
  width: 95vw;
  height: 95vh;
  max-width: 1200px;
  max-height: 900px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-card);
  flex-shrink: 0;
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-title-section h3 {
  font-size: 1.25rem;
  font-weight: 400;
}

.modal-badge {
  padding: 4px 12px;
  background: var(--accent-gradient);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 400;
  color: white;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}

.modal-close:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

/* Modal Preview */
.modal-preview {
  flex: 1;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-primary);
  overflow: hidden;
  min-height: 0;
}

.preview-frame {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--radius-md);
  cursor: zoom-in;
  transition: transform 0.2s ease;
}

.preview-image:hover {
  transform: scale(1.01);
}

/* Zoom Hint */
.zoom-hint {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: white;
  pointer-events: none;
  opacity: 0.7;
}

/* Zoom Overlay */
.zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: fadeIn 0.15s ease-out;
}

.zoomed-image {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.zoom-close-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  color: white;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.nav-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.nav-prev {
  left: 16px;
}

.nav-next {
  right: 16px;
}

/* Image Counter */
.image-counter {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 16px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  color: white;
}

/* Thumbnail Strip */
.thumbnail-strip {
  display: flex;
  gap: 8px;
  padding: 12px 24px;
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  overflow-x: auto;
  justify-content: center;
  flex-shrink: 0;
}

.thumbnail-item {
  width: 64px;
  height: 48px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  background: transparent;
  opacity: 0.6;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.thumbnail-item:hover {
  opacity: 0.9;
}

.thumbnail-item.active {
  border-color: var(--accent-primary);
  opacity: 1;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* No Image State */
.no-image-frame {
  background: var(--bg-tertiary);
}

.no-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-tertiary);
}

.no-image-icon {
  font-size: 4rem;
  opacity: 0.5;
}

.no-image-text {
  font-size: 1rem;
}

/* Modal Footer */
.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-card);
  flex-shrink: 0;
  max-height: 200px;
  overflow-y: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.project-info {
  flex: 1;
}

.project-info p {
  margin-bottom: 10px;
  font-size: 0.9375rem;
}

/* Features Section */
.project-features {
  margin: 12px 0;
  padding: 12px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.features-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent-primary);
  margin-bottom: 8px;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 4px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 3px 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Copyright Section */
.project-copyright {
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  align-self: flex-end;
}

.copyright-text {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 12px;
  }

  .modal-header {
    padding: 12px 16px;
  }

  .modal-preview {
    padding: 12px;
  }

  .modal-footer {
    padding: 12px 16px;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
  }

  .nav-prev {
    left: 8px;
  }

  .nav-next {
    right: 8px;
  }

  .thumbnail-strip {
    padding: 8px 16px;
  }

  .thumbnail-item {
    width: 48px;
    height: 36px;
  }
}
</style>
