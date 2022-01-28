<template>
  <div class="grid-areas" >
      <div class="double-area area" :style="`width:${area1.width}%`">
        <div class="inside-area"></div>
      </div>

      <div class="vertical-divider" @draggable="true" @dragstart="startMove" @dragend="finishMove"  ></div>

      <div class="double-area area" :style="`width:${area2.width}%`">
        <div class="inside-area"></div>
      </div>
      <!-- <div class="area"></div>
      <div class="area"></div> -->
  </div>
</template>

<script setup lang="ts" >
import { reactive, ref } from "vue";

const area1 = reactive({width: 49.5});
const area2 = reactive({width: 49.5});

function startMove(e: DragEvent) {
  console.log('startMove', /* {x: e.clientX, y: e.clientY}, e */);
  const value = (e.clientX / window.innerWidth) * 100;
  const bigger50 = value > 50 ? 100 - value : value;
  area1.width =  value;
  area2.width =  value
  console.log(value);
  
}
function moving(e: DragEvent) {
  console.log('moving', /* {x: e.clientX, y: e.clientY}, e */);
}
function finishMove(e: DragEvent) {
  console.log('finishMove', /* {x: e.clientX, y: e.clientY}, e */);
  const value = (e.clientX / window.innerWidth) * 100;
  area1.width =  value;
  area2.width =  value
  console.log(value);
  
}
</script>

<style>
.grid-areas {
  display: flex;
  height: 100vh;
  position: relative;
}

.area {
  padding: 0.05rem;
}

.double-area{
  height: 100%;
  width: 49.75%;
}

.inside-area {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(0, 255, 255, 0.2);
}


.vertical-divider {
  height: 100%;
  width: 1%;
  cursor: col-resize;
}
.vertical-divider:hover {
  background: cadetblue;
}

</style>