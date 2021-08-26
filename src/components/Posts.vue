<template>
  <div class="border-2">
    <select 
      v-model="selected" 
      @change="onChange($event)" 
      class="outline-none"
      :disabled="isManual"
    >
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
    onChange(event) {
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