<script setup>
import Chrono from "@/components/ChronoComponent.vue"
import NewChrono from "@/components/NewChronoComponent.vue"
import { useChronosStore } from "@/stores/chronos.js"

const chronosStore = useChronosStore()
</script>

<template>
  <div class="flex max-h-screen min-h-screen gap-2 bg-indigo-950 p-5">
    <TransitionGroup
      name="list"
      tag="div"
      class="flex flex-grow flex-wrap items-center justify-center gap-10 overflow-auto"
    >
      <Chrono
        :chrono="chrono"
        v-for="chrono in chronosStore.chronos.filter((ch) => !ch.archived)"
        :key="chrono"
      />
    </TransitionGroup>
    <div class="flex items-center">
      <NewChrono />
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(105%);
}
</style>
