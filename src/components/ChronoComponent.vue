<script setup>
import { useChronosStore } from "@/stores/chronos.js"
import {
  ArchiveBoxIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/vue/24/outline"

const { chrono } = defineProps({ chrono: Object })
const chronosStore = useChronosStore()

const start = () => {
  chronosStore.stopAllChronos()
  chrono.start()
}

const archive = () => {
  chrono.stop()
  chrono.archived = true
}
</script>

<template>
  <div
    class="flex w-96 flex-col justify-between gap-3 bg-white p-2 text-center shadow-md"
  >
    <div class="relative">
      <img :src="chrono.icon" class="mx-auto h-20 w-52 object-contain" />
      <h2 class="text-3xl">{{ chrono.title }}</h2>
      <p class="overflow-auto whitespace-nowrap">
        {{ chrono.subtitle || "&nbsp;" }}
      </p>
      <button
        v-if="!chrono.running"
        @click="archive"
        class="absolute left-1 top-1 text-red-600 hover:opacity-60"
      >
        <ArchiveBoxIcon class="h-12 w-12" />
      </button>
      <a
        v-if="chrono.link"
        :href="chrono.link"
        target="_blank"
        class="absolute right-1 top-1 text-blue-600 hover:opacity-60"
      >
        <ArrowTopRightOnSquareIcon class="h-12 w-12" />
      </a>
    </div>

    <div class="relative">
      <span v-time="chrono.total" class="text-5xl font-thin" />
      <div
        v-if="chrono.running"
        class="absolute right-1 top-0 mx-auto h-12 w-12 animate-pulse rounded bg-blue-500 transition-opacity"
      />
    </div>

    <button
      v-if="!chrono.running"
      @click="start"
      class="bg-gray-200 p-1 text-lg"
    >
      Start
    </button>
    <button v-else @click="chrono.stop" class="bg-gray-200 p-1 text-lg">
      Stop
    </button>
  </div>
</template>
