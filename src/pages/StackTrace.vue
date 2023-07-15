<template>
  <div class="container">
    <h1>Stack Trace</h1>


  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";

const props = defineProps({});
const emit = defineEmits([]);

onMounted(() => {
  console.trace()
});


</script>

<style lang="scss" scoped>

</style>