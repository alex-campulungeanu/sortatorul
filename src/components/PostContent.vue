<template>
  <div class="post-title">
    {{ title  }}
  </div>
  <div class="content-container" v-show="content !== undefined">
    {{ content }}    
  </div>
</template>

<script>
export default {
  name: 'PostContent',
  props: {
    content: String,
    title: String
  },
  emits: [],
  methods: {
  },
  mounted() {
    console.log(`the component is now mounted`)
  }
}
</script>

<style scope>
  .content-container {
    margin: 25px;
    padding: 10px 20px;
    cursor: pointer;
    border: 5px solid blue;
    border-bottom: 1px solid #ddd;
    border-radius: 10px;
  }
  .post-title {
    padding: 10px 20px;
    font-size: 2.2rem;
    margin-bottom: 5px;
  }
</style>