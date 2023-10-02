<script setup>
import { useChronosStore } from "@/stores/chronos.js"
import {
  ArrowUturnLeftIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline"
import { ref } from "vue"

const chronosStore = useChronosStore()

const title = ref("")
const subtitle = ref("")
const link = ref("")
const icon = ref("")

const deleteMode = ref(false)

const createModel = () => {
  if (
    !chronosStore.presets.some(
      (pre) => pre.title == title.value && pre.icon == icon.value,
    )
  )
    chronosStore.presets.push({ title: title.value, icon: icon.value })
}
</script>

<template>
  <div
    class="relative flex w-96 flex-col justify-between gap-2 bg-white p-2 text-center shadow-md"
  >
    <h2 class="text-xl">New Chronometer</h2>
    <button
      @click="deleteMode = !deleteMode"
      class="absolute right-2 top-2 hover:opacity-60"
    >
      <ArrowUturnLeftIcon v-if="deleteMode" class="h-6 w-6 text-blue-600" />
      <TrashIcon v-else class="h-6 w-6 text-red-600" />
    </button>
    <div class="grid grid-cols-4 items-center gap-2">
      <div
        v-for="(preset, i) in chronosStore.presets"
        class="flex aspect-square cursor-pointer items-center justify-center transition-transform hover:scale-110"
        @click="
          deleteMode
            ? chronosStore.presets.splice(i, 1)
            : ({ title, icon } = preset)
        "
        :title="preset.title"
      >
        <XMarkIcon v-if="deleteMode" class="fixed h-24 w-24 text-red-600" />
        <img
          class="flex items-center justify-center overflow-hidden"
          :class="deleteMode ? 'opacity-50' : ''"
          :src="preset.icon"
          :alt="preset.title"
        />
      </div>
      <div
        v-if="
          chronosStore.presets.length == 0 ||
          chronosStore.presets.length % 4 != 0
        "
        v-for="i in 4 - (chronosStore.presets.length % 4)"
        class="aspect-square bg-gray-300"
      />
    </div>
    <div class="flex flex-col gap-0.5 text-start">
      <label class="text-sm"
        >Title<span class="font-bold text-red-500">*</span>:</label
      >
      <input v-model="title" class="bg-blue-100 p-1 outline-none" />

      <label class="text-sm">Subtitle:</label>
      <input v-model="subtitle" class="bg-blue-100 p-1 outline-none" />

      <label class="text-sm">Link:</label>
      <input v-model="link" class="bg-blue-100 p-1 outline-none" />

      <label class="text-sm">Icon URL:</label>
      <input v-model="icon" class="bg-blue-100 p-1 outline-none" />
    </div>
    <button
      :disabled="!title"
      @click="createModel"
      class="bg-gray-200 px-3 py-1 text-lg disabled:opacity-50"
    >
      Create as model
    </button>
    <button
      :disabled="!title"
      @click="chronosStore.createChrono(title, subtitle, link, icon)"
      class="bg-blue-600 px-3 py-1 text-lg text-white disabled:opacity-50"
    >
      Create
    </button>
  </div>
</template>
