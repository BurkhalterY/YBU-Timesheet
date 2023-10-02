export const time = {
  mounted(el, binding) {
    el.innerText = new Date(binding.value).toISOString().substring(11, 19)
  },
  updated(el, binding) {
    el.innerText = new Date(binding.value).toISOString().substring(11, 19)
  },
}
