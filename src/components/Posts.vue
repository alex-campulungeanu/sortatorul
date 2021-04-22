<template>
  <div>
    <select v-model="selected" @change="onChange($event)">
      <option disabled value="">Please select a post</option>
      <option 
        v-for="post in posts" 
        v-bind:value="post.url" 
        v-bind:key="post.url"
      >
        {{post.label}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Posts",
  props: {
    posts: Array
  },
  setup() {
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    onChange(event) {
      this.$emit('set-current-post', event.target.value)
    }
  }
}
</script>