<template lang="pug">
div(:style="{ overflow: 'auto' }")
  a(href="https://vitejs.dev" target="_blank")
    img(src="/vite.svg" class="logo" alt="Vite logo")
  a(href="https://vuejs.org/" target="_blank")
    img(src="./assets/vue.svg" class="logo vue" alt="Vue logo")
  div {{ a }}
HelloWorld(msg="Vite + Vue")
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 2em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script setup lang="ts">
const a = $ref('test')
</script>
