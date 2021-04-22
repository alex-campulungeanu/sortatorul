<template>
  <footer>
    <p>Copyryght &copy; {{ new Date().getFullYear() }}</p>
    <router-link to="/about">
      About
    </router-link>
  </footer>
</template>

<style scoped>
    a {
        color: lightgray
    }
    footer {
        margin-top: 30px;
        text-align: center;
    }
</style>