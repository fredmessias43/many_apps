<template>
  <div class="icon-container" >
    <form @submit.prevent="handleSubmit" >
      <input type="text" name="" id=""  >
      <input type="submit" >
    </form>

    <div v-for="icon in icons" :key="icon" class="icon-wrapper" >
      <span>{{ icon }}:</span>
      <Icon :icon="icon" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import Icon from "../components/Icon.vue";

const props = defineProps({});
const emit = defineEmits([]);

const icons = ref([
"account-plus-outline",
"account-question",
]);

function handleSubmit(event)
{
  icons.value.unshift(event.target[0].value);  
}

</script>

<style scoped>
.icon-container {
  width: 20vw;
}
.icon-wrapper {
  display: grid;
  align-items: center;

  grid-template-columns: 1fr auto;

  border-bottom: 1px solid;
}
</style>