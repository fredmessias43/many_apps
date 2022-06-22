<template>
  <div
    class="drag-target"
    @dragover.prevent=""
    @drop.prevent="handledrop"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  
});
const emit = defineEmits([
  "drop"
]);
function handledragover() {
  console.log("dragover")
}
function handledrop(event) {
  const data = event.dataTransfer.getData("text/plain");
  emit("drop", data);
}
</script>

<style scoped>

</style>
