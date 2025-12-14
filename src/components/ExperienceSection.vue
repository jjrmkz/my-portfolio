<template>
  <section id="experience" class="experience-section section">
    <div class="container">
      <div class="section-title">
        <span>ประสบการณ์</span>
        <h2 ref="titleRef" class="fade-in" :class="{ visible: isTitleVisible }">Experience & Journey</h2>
        <p class="section-subtitle">ประสบการณ์การทำงานเกี่ยวกับ FiveM และการพัฒนา UI</p>
      </div>

      <!-- Timeline -->
      <div class="timeline" ref="timelineRef">
        <div 
          v-for="(exp, index) in experiences" 
          :key="exp.id"
          class="timeline-item fade-in"
          :class="{ visible: isTimelineVisible, 'left': index % 2 === 0, 'right': index % 2 !== 0 }"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="timeline-marker">
            <div class="marker-dot"></div>
          </div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-date">{{ exp.period }}</span>
              <span class="timeline-type" :class="exp.type">{{ exp.typeLabel }}</span>
            </div>
            <h3 class="timeline-title">{{ exp.title }}</h3>
            <p class="timeline-company">{{ exp.company }}</p>
            <p class="timeline-description">{{ exp.description }}</p>
            <div class="timeline-tags">
              <span v-for="tag in exp.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '../composables/useParallax'

const { isVisible: isTitleVisible, elementRef: titleRef } = useIntersectionObserver()
const { isVisible: isTimelineVisible, elementRef: timelineRef } = useIntersectionObserver()

const experiences = ref([
  {
    id: 1,
    period: '2025 - ปัจจุบัน',
    title: 'FiveM UI Developer',
    company: 'ฟรีแลนซ์ / ACE CITY',
    description: 'พัฒนาและออกแบบ User Interface สำหรับเซิร์ฟเวอร์ FiveM (ACE CITY และโปรเจกต์อื่น ๆ) ควบคู่กับการพัฒนาทักษะด้าน Frontend และเทคโนโลยีใหม่ ๆ อย่างต่อเนื่อง',
    tags: ['HTML', 'CSS', 'JavaScript','Figma','NUI','Vue.js', 'Tailwind CSS'],
    type: 'work',
    typeLabel: 'งานหลัก'
  },
  {
    id: 2,
    period: '2024 - 2025',
    title: 'UI/UX Developer & Designer',
    company: 'รับงานอิสระด้าน UI (โปรเจกต์ขนาดเล็กถึงขนาดใหญ่)',
    description: 'ออกแบบและพัฒนา UI สำหรับ FiveM เรียนรู้การทำงานของ Logic ระบบต่าง ๆ การเชื่อมต่อกับ NUI เบื้องต้น รวมถึงเริ่มศึกษาและใช้งาน Vue.js ในการพัฒนา UI',
    tags: ['Figma', 'HTML/CSS', 'JavaScript','NUI', 'Vue.js'],
    type: 'learning and work',
    typeLabel: 'ประสบการณ์'
  },
  {
    id: 3,
    period: '2023 - 2024',
    title: 'พัฒนาทักษะและศึกษา JavaScript',
    company: 'การศึกษาด้วยตนเอง (Self-Learning)',
    description: 'ต่อยอดจากพื้นฐาน HTML และ CSS ศึกษาการใช้งาน JavaScript ตั้งแต่ระดับพื้นฐานจนถึงระดับที่สูงขึ้น เพื่อเพิ่มความสามารถในการพัฒนาเว็บไซต์และ UI',
    tags: ['JavaScript (Basic to Advanced)'],
    type: 'learning',
    typeLabel: 'เรียนรู้'
  },
  {
    id: 4,
    period: '2022 - 2023',
    title: 'เริ่มต้นการเรียนรู้การพัฒนาเว็บไซต์',
    company: 'การศึกษาด้วยตนเอง (Self-Learning)',
    description: 'ศึกษาพื้นฐานการพัฒนาเว็บไซต์ เรียนรู้โครงสร้างและการจัดรูปแบบหน้าเว็บด้วย HTML และ CSS',
    tags: ['HTML', 'CSS'],
    type: 'learning',
    typeLabel: 'เริ่มต้น'
  },
])
</script>

<style scoped>
.experience-section {
  background: var(--bg-primary);
}

.section-subtitle {
  color: var(--text-secondary);
  max-width: 500px;
  margin: 16px auto 0;
  text-align: center;
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto 60px;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary));
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
}

.timeline-item.left {
  left: 0;
  text-align: right;
  padding-right: 60px;
}

.timeline-item.right {
  left: 50%;
  text-align: left;
  padding-left: 60px;
}

.timeline-marker {
  position: absolute;
  top: 30px;
  width: 20px;
  height: 20px;
}

.timeline-item.left .timeline-marker {
  right: -10px;
}

.timeline-item.right .timeline-marker {
  left: -10px;
}

.marker-dot {
  width: 20px;
  height: 20px;
  background: var(--accent-gradient);
  border-radius: 50%;
  border: 4px solid var(--bg-primary);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
}

.timeline-content {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: all var(--transition-normal);
}

.timeline-content:hover {
  border-color: var(--accent-primary);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.timeline-item.left .timeline-header {
  flex-direction: row-reverse;
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--accent-primary);
  font-weight: 600;
}

.timeline-type {
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-weight: 500;
}

.timeline-type.work {
  background: rgba(139, 92, 246, 0.15);
  color: var(--accent-primary);
}

.timeline-type.learning {
  background: rgba(6, 182, 212, 0.15);
  color: #06b6d4;
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.timeline-company {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.timeline-description {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.timeline-item.left .timeline-tags {
  justify-content: flex-end;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 60px !important;
    padding-right: 20px !important;
    text-align: left !important;
  }
  
  .timeline-item.left,
  .timeline-item.right {
    left: 0;
  }
  
  .timeline-marker {
    left: 10px !important;
    right: auto !important;
  }
  
  .timeline-header {
    flex-direction: row !important;
  }
  
  .timeline-tags {
    justify-content: flex-start !important;
  }
}
</style>
