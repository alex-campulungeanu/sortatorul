<template>
  <div class="flex justify-center m-5">
    <Button :isActive="currentPost !== ''" :text="'Original'" :color="'#FF7F50'" @btn-click="sortOriginal()" />
    <Button :isActive="currentPost !== ''" :text="'Best'" :color="'#009933'" @btn-click="sortUp()" />
    <Button :isActive="currentPost !== ''" :text="'Worst'" :color="'#990033'" @btn-click="sortDown()" />
  </div>

  <div class="flex flex-col m-10">
    <div class="mb-3"> 
      <span class="font-bold"> CURRENT POST : </span> {{this.currentPost}}
    </div>
    <hr class="h-6"/>
    <div class="flex flex-col content-between mb-6">
      <div>
        <input type="checkbox" v-model="isManual" @input="currentPost=''" >
        <span class="ml-1">Manual URL</span>
      </div>
      <div class="max-w-2xl">
        <div v-if="isLoading">
          <LoadingIndicator />
        </div>
        <div v-else>
          <div v-if="!isManual">
            <PostSelectList :posts="posts" @set-current-post="setCurrentPost" :isManual="isManual" />
          </div>
          <div v-else>
            <ManualPostInput @set-current-post="setCurrentPost" />
          </div>
        </div>
      </div>
    </div>
    <Button 
      :isActive="currentPost !== ''" 
      :text="'Go'" 
      :color="'#990033'" 
      @btn-click="fetchPostDetails()"
      class="max-w-2xl"
    />
  </div>
  
  <PostContent :content="postContent" :title="postTitle" />
  <Comments :comments="comments" />
</template>

<script>
import axios from 'axios'
import PostSelectList from '../components/PostSelectList.vue'
import ManualPostInput from '../components/ManualPostInput.vue'
import Comments from '../components/Comments.vue'
import PostContent from '../components/PostContent.vue'
import Button from '../components/Button.vue'
import {SERVER_API_BASE_URL} from '../config/constants'
import {sortJsonByProperty} from '../config/utils'
import LoadingIndicator from '../components/LoadingIndicator.vue'
import axiosInstance from '../libs/axios-instance'
 
export default {
  name: 'Home',
  components:{ 
    PostSelectList,
    Comments,
    Button,
    PostContent,
    LoadingIndicator,
    ManualPostInput
  },
  props: {
  },
  data () {
    return {
      comments: [],
      posts: [],
      currentPost: '',
      postDetail: '',
      postTitle: '',
      isManual: false,
      isLoading: false,
    }
  },
  async created() {
    try {
      this.isLoading = true
      this.posts = await this.fetchPosts()
      this.isLoading = false
    } catch (error) {
      console.log(error) //TODO: change this with a popper
    }
  },
  methods: {
    onCheckManual() {
      console.log('Change manual')
    },
    async fetchPostDetails() {
      let response = await axiosInstance.get(`${SERVER_API_BASE_URL}/post-details?url=${this.currentPost}`)
      console.log('response', response)
      if (response.status == 200) {
        const {data: details} = response
        details.data.comments.sort(sortJsonByProperty('up'))
        this.comments = details.data.comments
        this.postContent = details.data.content
        this.postTitle = details.data.title
      } else {
        // TODO: add here a notification system with an error on the page
        this.comments = [{}]
        this.postContent = ''
      }
    },
    async fetchPosts() {
      let {data} = await axios.get(`${SERVER_API_BASE_URL}/posts`)
      return data.data
    },
    // TODO: maybe id dont' need 3 methods, only one with sorting direction is enough
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