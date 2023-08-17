<template>
  <button
    :style="{background: conditionalColor}"
    class="btn"
    @click="onClick()"
    :disabled="!isActive"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    color: String,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    conditionalColor: function() {
      if (this.isActive) {
        return this.color
      } else {
        return '#808080'
      }
    }
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    }
  }
}
</script>