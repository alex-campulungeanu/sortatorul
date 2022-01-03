<template>
  <!-- <div class="container"> -->
  <div>
    <!-- <Sidebar /> -->
    <router-view />
    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Sidebar from './components/Sidebar'
// import Header from './components/Header.vue'
// import Footer from './components/Footer.vue'


export default {
  name: 'App',
  components: {
    // Sidebar,
    // Header,
    // Footer
  },
  data() {
    return { }
  },
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  .container {
    /* max-width: 500px; */
    margin: 30px;
    overflow: auto;
    /* min-height: 300px; */
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
  .btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }
  .btn:focus {
    outline: none;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  @media only screen and (max-width: 760px), (min-width: 768px) and (max-width: 1024px) {
    select {
      width: 150px;
    }
  }
</style>