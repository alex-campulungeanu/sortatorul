<template>
  <div
    v-for="comment in comments"
    :key="comment.id"
  >
    <Comment
      :comment="comment"
    />
    <div
      v-for="child in comment.childs"
      :key="child.id"
    >
      <Comment
        :comment="child"
      />
    </div>
  </div>
</template>

<script>
import Comment from './Comment.vue'
export default {
  name: 'Comments',
  components: {
    Comment
  },
  props: {
    comments: Array
  },
  emits: [],
  methods: {
  }
}
</script>