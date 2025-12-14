<template>
  <div class="skeleton" :class="[`skeleton-${type}`, customClass]" :style="customStyle"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text', // text, title, image, card, circle
    validator: (value) => ['text', 'title', 'image', 'card', 'circle', 'custom'].includes(value)
  },
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  customClass: {
    type: String,
    default: ''
  }
})

const customStyle = computed(() => {
  const styles = {}
  if (props.width) styles.width = props.width
  if (props.height) styles.height = props.height
  if (props.type === 'circle') {
    styles.borderRadius = '50%'
  }
  return styles
})
</script>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-card-hover) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1rem;
  width: 100%;
  margin: 0.5rem 0;
  border-radius: var(--radius-sm);
}

.skeleton-title {
  height: 2rem;
  width: 60%;
  margin-bottom: 1rem;
  border-radius: var(--radius-sm);
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--radius-md);
}

.skeleton-card {
  width: 100%;
  height: 300px;
  border-radius: var(--radius-lg);
}

.skeleton-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>
