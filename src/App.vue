<template>
  <div class="app">
    <header>
      <nav id="nav">
        <router-link 
          v-for="route in routes" 
          :key="route.name" 
          :to="route.path"
        > 
          {{ route.meta.label }}
        </router-link> 
      </nav>
    </header>
    <main>
      
      <router-view/>

    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const $router = useRouter();
const routes = ref($router.getRoutes());

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
button {
  cursor: pointer;
}

#app {
  height: 100vh;
}
.app {
  padding: 1.5rem;
  height: 100%;
}

nav a {
  padding: 0 0.5rem;
  border-right: 1px solid black;
}

.container {
    margin: 0 auto;
    max-width: 1080px;
}
.row{
  display: flex;
}
.row .col {
  flex: 1;
}
.flex-all {
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapper {
    display: flex;
    flex-direction: column;

    margin: 1rem auto;
    max-width: 760px;
}
</style>
