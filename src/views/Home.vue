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
    <div> 
      <span class="font-bold"> CURRENT POST : </span> {{this.currentPost}}
    </div>
    <hr class="h-6"/>
    <Posts 
      :posts="posts"
      @set-current-post="setCurrentPost"
      :isManual="isManual"
    />
    <div class="m-2">
      <input
        type="checkbox" 
        v-model="isManual"
        @input="currentPost=''"
      >
      <span class="ml-1">Enter URL manualy</span>
    </div>
    <div 
      class=""
      v-if="isManual"
    >
      <input
        type="text" 
        class="border-2 outline-none w-full"
        v-model="currentPost"
        @input="setCurrentPost"
      >
    </div>
    <br>
    <Button
      v-if="currentPost != ''"
      :text="'Go'"
      :color="'#990033'"
      @btn-click="fetchComments()"
    />
  </div>
  <PostContent 
    :content="postContent"
  />
  <Comments
    :comments="comments"
  />
</template>

<script>
import axios from 'axios'
import Posts from '../components/Posts.vue'
import Comments from '../components/Comments.vue'
import PostContent from '../components/PostContent.vue'
import Button from '../components/Button.vue'
import {SERVER_API_BASE_URL} from '../config/constants'
import {sortJsonByProperty} from '../config/utils'

export default {
  name: 'Home',
  components:{ 
    Posts,
    Comments,
    Button,
    PostContent
  },
  props: {
  },
  data () {
    return {
      comments: [],
      posts: [],
      currentPost: '',
      postDetail: '',
      isManual: false
    }
  },
  async created() {
    try {
      this.posts = await this.fetchPosts()
    } catch (error) {
      console.log(error) //TODO: change this with a popper
    }
  },
  methods: {
    onCheckManual() {
      console.log('Change manual')
    },
    async fetchComments() {
      let {data: comments} = await axios.get(`${SERVER_API_BASE_URL}/comments?url=${this.currentPost}`)
      if (comments.success) {
        comments.data.sort(sortJsonByProperty('up'))
        this.comments = comments.data
      } else {
        this.comments = [{}]
      }
    },
    async fetchPostContent() {
      this.postContent = 'some details of the content some detailsome details of the contentsome details of the contentsome details of the contentsome details of the contentsome details of the contentsome details of the contentsome details of the contentsome details of the contents of the contentsome details of the contentsome details of the contentsome details of the content'
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
    async setCurrentPost(event) {
      this.currentPost = event.target.value
    },
  },
}
</script>