<template>
  <label class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
    Search a post
  </label>
  <input
    @input="onChangeInput"
    type="text" 
    class="p-2.5 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none focus:outline-none" 
    placeholder="Search post"
  >
</template>

<script>
export default {
  name: "ManualPostInput",
  props: {
  },
  setup() {
  },
  data () {
  },
  methods: {
    onChangeInput(event) {
      this.$emit('set-current-post', event)
    }
  }
}
</script>