<template>
  <div class="post-title pt-8 text-base font-semibold leading-7">
    {{ title  }}
  </div>
  <div 
    class="content-container space-y-6 py-8 text-base leading-7 text-gray-600" 
    v-show="content !== undefined" 
    v-html="content"
  >
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
    // console.log(`the component is now mounted`)
  }
}
</script>

<style scope>
  .content-container {
    margin: 25px;
    padding: 10px 20px;
    border: 5px solid rgb(223, 223, 236);
    border-bottom: 1px solid #ddd;
    border-radius: 10px;
    background: #e2e8eb;
  }
  .post-title {
    padding: 10px 20px;
    font-size: 2.2rem;
    margin-bottom: 5px;
  }
</style>