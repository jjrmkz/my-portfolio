<template>
  <div id="app-root">
    <TheNavbar />
    <main>
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <PortfolioSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<style>
/* App-specific styles are in main.css */
#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
