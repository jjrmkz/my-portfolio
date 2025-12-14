<template>
  <section id="portfolio" class="portfolio-section section">
    <div class="container">
      <div class="section-title">
        <span>ผลงาน</span>
        <h2 ref="titleRef" class="fade-in" :class="{ visible: isTitleVisible }">FiveM UI Collection</h2>
        <p class="section-subtitle">รวมผลงาน User Interface ทั้งหมด</p>
      </div>

      <!-- Portfolio Grid -->
      <div class="portfolio-grid" ref="gridRef">
        <TransitionGroup name="portfolio">
          <PortfolioCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
            class="fade-in"
            :class="{ visible: isGridVisible }"
            @click="openPreview(project)"
          />
        </TransitionGroup>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <UIPreviewModal
      :isOpen="isModalOpen"
      :project="selectedProject"
      @close="closePreview"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '../composables/useParallax'
import PortfolioCard from './PortfolioCard.vue'
import UIPreviewModal from './UIPreviewModal.vue'

const { isVisible: isTitleVisible, elementRef: titleRef } = useIntersectionObserver()
const { isVisible: isGridVisible, elementRef: gridRef } = useIntersectionObserver()

const isModalOpen = ref(false)
const selectedProject = ref(null)

// Projects data - Multiple images support with features
const projects = ref([
  {
    id: 1,
    title: 'Quick Menu',
    description: 'เมนูอำนวยความสะดวก',
    icon: '/img/quickmenu/quick_1.png',
    images: ['/img/quickmenu/quick_1.png', '/img/quickmenu/quick_2.png', '/img/quickmenu/quick_3.png'],
    tags: ['Vue JS', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Shortcut Menu',
      'Activities Tab',
      'Update Notification',
      'Settings Tab',
      'Show Player Name / Player ID',
    ]
  },
  {
    id: 2,
    title: 'Scoreboard',
    description: 'สกอร์บอร์ด แสดงสถานะต่างๆ',
    icon: '/img/scoreboard.png',
    images: ['/img/scoreboard/scoreboard.png', '/img/scoreboard/scoreboard_2.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Show / Hide Phone Number',
      'Agency Online',
      'Show Time and Date',
      'Smooth Voicebar Animation',
    ],
    copyright: 'Copyright of ACE CITY'
  },
  {
    id: 3,
    title: 'Banking',
    description: 'เมนูธนาคาร',
    icon: '/img/banking/bank_1.png',
    images: ['/img/banking/bank_1.png', '/img/banking/bank_2.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Smooth Animation',
      'Show / Hide Player Balance',
      'Show Player Cash',
      'Quick Select',
    ],
    copyright: 'Copyright of ACE CITY'
  },
  {
    id: 4,
    title: 'Weapon Skin Menu',
    description: 'เมนูเปลี่ยนสกินอาวุธ',
    icon: '/img/weaponskin/wpskin.png',
    images: ['/img/weaponskin/wpskin.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Skin Search System',
      'Weapon Category Dropdown',
      'Preview Skin Image',
      'Status Display',
    ],
    copyright: 'Copyright of ACE CITY'
  },
  {
    id: 5,
    title: 'Guidebook',
    description: 'คู่มือแนะนำผู้เล่นใหม่',
    icon: '/img/guidebook/guidebook_1.png',
    images: ['/img/guidebook/guidebook_1.png', '/img/guidebook/guidebook_2.png'],
    tags: ['Vue JS','HTML', 'CSS', 'JavaScript'],
    features: [
      'Smooth Animation',
      'Search System Realtime Update',
      'Flexible Customization',
    ],
    copyright: 'Copyright of ACE CITY'
  },
  {
    id: 6,
    title: 'Shop',
    description: 'หน้าต่างร้านค้า',
    icon: '/img/shop/shop_1.png',
    images: ['/img/shop/shop_1.png', '/img/shop/shop_2.png', '/img/shop/shop_3.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Item Hover Animation',
      'Category Filter',
      'Payment Modal',
    ],
    copyright: 'Copyright of SR Shop'
  },
  {
    id: 6,
    title: 'Event Notification',
    description: 'แจ้งเตือนกิจกรรมทุกประเภท',
    icon: '/img/event_noti/ev_noti.png',
    images: ['/img/event_noti/ev_noti.png', '/img/event_noti/ev_noti_2.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Show Player In Dimension',
    ],
    copyright: 'Copyright of SR Shop'
  },
  {
    id: 7,
    title: 'Dimension',
    description: 'ระบบแยกมิติ',
    icon: '/img/dimension/dm_1.png',
    images: ['/img/dimension/dm_1.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Show Cooldown',
      'Show Remaining Count',
      'Flexible Element Customization',
    ],
    copyright: 'Copyright of SR Shop'
  },
  {
    id: 8,
    title: 'Rentcar',
    description: 'หน้าต่างระบบเช่ารถ',
    icon: '/img/rentcar/rentcar_1.png',
    images: ['/img/rentcar/rentcar_1.png', '/img/rentcar/rentcar_2.png', '/img/rentcar/rentcar_3.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Form System',
      'Player Signature',
      'Vehicle Rent List',
    ],
    copyright: 'Copyright of ACE CITY'
  },
  {
    id: 9,
    title: 'Supermarket',
    description: 'หน้าต่างร้านค้า',
    icon: '/img/supermarket/supermarket.png',
    images: ['/img/supermarket/supermarket.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Category Filter',
      'Show Player Balance / Money',
      'Choose Payment Method',
    ],
    copyright: 'Copyright of ACE CITY'
  },
  {
    id: 10,
    title: 'NC Radio List',
    description: 'หน้าต่างวิทยุสื่อสาร',
    icon: '/img/radio/radio_1.png',
    images: ['/img/radio/radio_1.png'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Show Current Speaker',
      'Show Radio Digit(Hz)',
      'Show Player ID',
      'Voicebar Animation',
    ],
    copyright: 'Copyright of ACE CITY'
  },
])

const openPreview = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

const closePreview = () => {
  isModalOpen.value = false
}
</script>

<style scoped>
.portfolio-section {
  background: var(--bg-primary);
}

.section-subtitle {
  color: var(--text-secondary);
  max-width: 500px;
  margin: 16px auto 0;
  text-align: center;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 24px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.filter-tab:hover {
  border-color: var(--border-color-hover);
  color: var(--text-primary);
}

.filter-tab.active {
  background: var(--accent-gradient);
  border-color: transparent;
  color: white;
}

/* Portfolio Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Transition Group */
.portfolio-move,
.portfolio-enter-active,
.portfolio-leave-active {
  transition: all 0.5s ease;
}

.portfolio-enter-from,
.portfolio-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.portfolio-leave-active {
  position: absolute;
}

/* Responsive */
@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}
</style>
