<template>
  <div 
    class="draggable"
    draggable="true"
    @drag="handledrag"
    @dragend="handledragend"
    @dragstart="handledragstart"
  >
    <slot  ></slot>

  </div>
</template>

<script setup>
// import { createElementVNode, h, onMounted, ref, useSlots } from 'vue';

const props = defineProps({
  data: String,
});
const emit = defineEmits([
  "dragend"
]);

// const slots = useSlots();

function handledrag(e) {}
function handledragend(e) {}
function handledragstart(event) {
  // set data
  event.dataTransfer.setData('text/plain', props.data);
  
  // const slot = slots.default()[0];
  // let child = h(slot.type, {...slot.props}, slot.children);
  // console.log(event.dataTransfer);

  // event.dataTransfer.setDragImage(  , 0, 0);
} 

</script>

<style scoped>

</style>


