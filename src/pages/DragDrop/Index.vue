<template>
  <div class="container" >

    <DragTarget @drop="handleDropItem1($event)" >
      <ul class="drag-list" >
        <li v-for="item in items1" >
          <Draggable class="drag-item" :data="item" >
            {{item}}
          </Draggable>
        </li>
      </ul>
    </DragTarget>

    <DragTarget @drop="handleDropItem2($event)" >
      <ul class="drag-list" >
        <li v-for="item in items2" >
          <Draggable class="drag-item" :data="item" >
            {{item}}
          </Draggable>
        </li>
      </ul>
    </DragTarget>
  </div>
</template>

<script setup>
import DragTarget from "./DragTarget.vue";
import Draggable from "./Draggable.vue";
import { ref } from "vue";

const items1 = ref(["1","2","3","4"]);
const items2 = ref([]);


function handleDropItem1(data) {
  const idx = items2.value.indexOf(data);
  if (idx > -1) {
    items2.value.splice(idx , 1);
    
    items1.value.push(data);
  }

}

function handleDropItem2(data) {
  const idx = items1.value.indexOf(data);
  if (idx > -1) {
    items1.value.splice(idx , 1);
    
    items2.value.push(data);
  }

}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
.drag-item{
  width: 5rem;
  height: 5rem;
  border: 2px dashed blue;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;  
}

.drag-list {
  width: 10rem;
  height: 10rem;
  outline: 2px dashed orange;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;}
  ul {
    list-style: none;
  }
.drag-target {
}
</style>