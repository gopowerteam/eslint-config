<template>
  <div>1111</div>
  <div>
    <div>123</div>
    <HelloWorld msg="msg" />
    <input
      v-model="a"
      a="2"
      b="2"
      style="color:red;"
    >
  </div>
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
