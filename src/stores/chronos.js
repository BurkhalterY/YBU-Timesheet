import { useChrono } from "@/composables/chrono.js"
import { defineStore } from "pinia"
import { reactive, watch } from "vue"

export const useChronosStore = defineStore("chronos", () => {
  const presets = reactive(
    JSON.parse(localStorage.getItem("TS_PRESETS") || "[]")
  )
  const chronos = reactive(
    JSON.parse(localStorage.getItem("TS_CHRONOS") || "[]").map((ch) =>
      useChrono(ch)
    )
  )

  watch(presets, () => {
    localStorage.setItem("TS_PRESETS", JSON.stringify(presets))
  })
  watch(chronos, () => {
    localStorage.setItem(
      "TS_CHRONOS",
      JSON.stringify(
        chronos.map((ch) => ({
          date: ch.date,
          archived: ch.archived,
          title: ch.title,
          subtitle: ch.subtitle,
          link: ch.link,
          icon: ch.icon,
          counters: ch.counters,
        }))
      )
    )
  })

  const createChrono = (title, subtitle = "", link = "", icon = "") => {
    const chrono = useChrono({ title, subtitle, link, icon })
    chronos.push(chrono)
  }

  const stopAllChronos = () => {
    for (let chrono of chronos) {
      chrono.stop()
    }
  }

  return { chronos, createChrono, stopAllChronos, presets }
})
