<template>
  <div :class="['comment', comment.parentId != 0 ? 'children' : '']">
    <div>
      <div class="comment-header">
        <h3>{{ comment.author }}</h3>
        <!-- <div class="comment-nr">#{{comment.nr}}</div> -->
        <div class="comment-nr">
          #{{ comment.nr }}
        </div>
      </div>
      <p style="margin-right:50px">
        {{ comment.body }}
      </p>
    </div>
    <div class="votes-container">
      <div />
      <div class="votes">
        <div class="up">
          {{ comment.up }}
        </div>
        <div class="down">
          {{ comment.down }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object
  },
  methods: {
  },
}
</script>

<style scope>
  .fas {
    color: red;
  }
  .comment {
    margin: 5px 15px;
    padding: 10px 20px;
    cursor: pointer;
    border-left: 5px solid green;
    border-bottom: 1px solid #ddd;
    border-radius: 10px;
    background: #e4e8eb;
  }
  .comment.children {
    background: #fafbfc;
    margin-left: 3rem;
    border-left: 0;
    border-bottom: 1px solid #ddd;
  }
  .comment h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .comment-header{
    display: flex;
    justify-content: space-between;
  }
  .comment-nr {
    color: #ccc;
    font-size: 1rem;
    font-weight: 400;
  }
  .votes-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .votes {
    display: flex;
    flex-direction: row;
  }
  .votes .up{
    margin-right: 10px;
    color: #009933
  }
  .votes .down{
    color: #990033
  }
</style>