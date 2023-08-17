<template>
  <label class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
    Select an post
  </label>
  <select
    v-model="selected" 
    @change="onChangeSelect($event)" 
    :disabled="isManual"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none focus:outline-none"
  >
    <option disabled value="">Please select a post</option>
    <option v-for="post in posts" v-bind:value="post.url" v-bind:key="post.url" >
      {{post.label}}
    </option>
  </select>
</template>

<script>
export default {
  name: "PostSelectList",
  props: {
    posts: Array,
    isManual: Boolean
  },
  setup() {
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    onChangeSelect(event) {
      this.$emit('set-current-post', event)
    }
  },
  watch: {
    isManual: function(newVal, oldVal){
      this.selected = ''
    }
  }
}
</script>