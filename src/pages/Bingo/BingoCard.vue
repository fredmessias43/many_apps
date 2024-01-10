<template>
  <div class="bingo-card">
    <div class="header">
      <div class="id bingo-box">
        <span>Nº</span>
      </div>

      <div class="torneio bingo-box">
        <span>TORNEIO</span>
      </div>
    </div>

    <div class="title bingo-box">
      <span>BINGO</span>
    </div>

    <div class="body">
      <div 
        v-for="number, index in numbers"
        :key="index.id" class="bingo-number"
        :class="[{ 'can-be-selected': selectedNumbers.includes(number.value) }]"
        @click="number.marked = !number.marked"
      >
        <div v-if="number.marked" class="marked"></div>
        <span v-if="index != 12" >{{ number.value }}</span>
        <Tamoio v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"

import { generateUniqueNumber } from '@/utils/number';
import Tamoio from './Tamoio.vue';

const props = defineProps({
  selectedNumbers: {
    type: Array,
    default: []
  }
});
const emit = defineEmits([]);

const numbers = ref([]);
const lastNumberSelected = ref(0);

onMounted(() => {
  numbers.value = Array(25).fill().map((e, i) => ({
    value: generateUniqueNumber(90, 1, numbers.value),
    marked: false,
  }));
});

watch(
  () => props.selectedNumbers,
  (value) => {
    lastNumberSelected.value = props.selectedNumbers[props.selectedNumbers.length - 1];
  }
);

</script>

<style scoped>
.bingo-box {
  border-radius: 8px;
  background-color: white;
  color: var(--accent);
  padding: 1rem;
}
.bingo-card {
  --accent: #1900ff;
  
  width: min-content;
  padding: 1.5rem;
  background-color: var(--accent);
  border-radius: 8px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1px;
}
.id {
  width: 25%;
}
.title span {
  font-size: 4rem;
  letter-spacing: 2.3rem;
  margin-inline-end: -6rem;
  margin-bottom: 1px;
}
.body {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);

  width: min-content;
}
.bingo-number {
  width: 5rem;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  margin: 1px;
  position: relative;
}
.bingo-number:first-child {
  border-top-left-radius: 8px;
}
.bingo-number:nth-child(5) {
  border-top-right-radius: 8px;
}
.bingo-number:nth-child(21) {
  border-bottom-left-radius: 8px;
}
.bingo-number:last-child {
  border-bottom-right-radius: 8px;
}
.bingo-number.can-be-selected {
  cursor: pointer;
}
.bingo-number .marked {
  position: absolute;
  inset: 0;
  top: 25%;
  left: 25%;
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid red;
  border-radius: 50%;
}
</style>