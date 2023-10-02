import { computed, ref } from "vue"

export const useChrono = (values) => {
  const date = ref(values.date || new Date().toISOString().slice(0, 10))
  const archived = ref(values.archived || false)
  const title = ref(values.title || "")
  const subtitle = ref(values.subtitle || "")
  const link = ref(values.link || "")
  const icon = ref(values.icon || "")
  const counters = ref(values.counters || [])
  const refresh = ref(false)

  const total = computed(() => {
    refresh.value
    return counters.value.reduce(
      (tot, counter) => tot + (counter.end || Date.now()) - counter.start,
      0
    )
  })

  const running = computed(() =>
    counters.value.length
      ? counters.value[counters.value.length - 1].end === false
      : false
  )

  const start = () => {
    if (!running.value)
      counters.value.push({
        start: Date.now(),
        end: false,
      })
  }

  const stop = () => {
    if (running.value)
      counters.value[counters.value.length - 1].end = Date.now()
  }

  setInterval(() => {
    if (running.value) refresh.value = !refresh.value
  }, 100)

  return {
    date,
    archived,
    title,
    subtitle,
    link,
    icon,
    counters,
    total,
    running,
    start,
    stop,
  }
}
