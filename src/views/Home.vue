<template>
  <div class="flex justify-center m-5">
    <Button
      :text="'Original'"
      :color="'#FF7F50'"
      @btn-click="sortOriginal()"
    />
    <Button
      :text="'Best'"
      :color="'#009933'"
      @btn-click="sortUp()"
    />
    <Button
      :text="'Worst'"
      :color="'#990033'"
      @btn-click="sortDown()"
    />
  </div>
  <div class="grid justify-center m-10">
    <div> <span class="font-bold"> CURRENT POST => </span> {{this.currentPost}}</div>
    <hr class="h-5"/>
    <Posts 
      :posts = "posts"
      @set-current-post="setCurrentPost"
    />
  </div>
  <Comments
    :comments="comments"
  />
</template>

<script>
import axios from 'axios'
import Posts from '../components/Posts.vue'
import Comments from '../components/Comments.vue'
import Button from '../components/Button.vue'
import {SERVER_API_BASE_URL} from '../config/constants'
import {sortJsonByProperty} from '../config/utils'

export default {
  name: 'Home',
  components:{ 
    Posts,
    Comments,
    Button
  },
  props: {
  },
  data () {
    return {
      comments: [],
      posts: [],
      currentPost: ''
    }
  },
  async created() {
    try {
      this.posts = await this.fetchPosts()
      let lastPost = this.posts[0].url
      this.currentPost = lastPost
      this.comments = await this.fetchComments(lastPost)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async fetchComments(url) {
      let currentPost = url
      let {data: comments} = await axios.get(`${SERVER_API_BASE_URL}/comments?url=${currentPost}`)
      if (comments.success) {
        comments.data.sort(sortJsonByProperty('up'))
        return comments.data
      } else {
        return [{}]
      }
    },
    async fetchPosts() {
      let {data} = await axios.get(`${SERVER_API_BASE_URL}/posts`)
      return data.data
    },
    sortOriginal() {
      this.comments.sort(sortJsonByProperty('nr', true))
    },
    sortUp() {
      this.comments.sort(sortJsonByProperty('up'))
    },
    sortDown() {
      this.comments.sort(sortJsonByProperty('down'))
    },
    async setCurrentPost(currentPost) {
      this.currentPost = currentPost
      this.comments = await this.fetchComments(currentPost)
    },
  },
}
</script>