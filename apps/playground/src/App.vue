<template lang="pug">
div(:style="{ overflow: 'auto' }")
  a(href="https://vitejs.dev" target="_blank")
    img(alt="Vite logo" class="logo" src="/vite.svg")
  a(href="https://vuejs.org/" target="_blank")
    img(alt="Vue logo" class="logo vue" src="./assets/vue.svg")
  div {{ a }}
HelloWorld(a="1" b="2" msg="Vite + Vue" )
input(v-model="a" a="2" b="2" style="color:red;")
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
import HelloWorld from './components/HelloWorld.vue'

const a = $ref('test')
</script>
