<template>
  <div class="container">
    <h1>Bingo</h1>

    <div class="row">
      <div class="col-6 bingo-cards">
       <BingoCard :selectedNumbers="numbers" />
      </div>
      <div class="col-6">

        <h1 class="last-number">
          {{ numbers[numbers.length - 1] }}
        </h1>

        <div class="numbers"> 
          <div v-for="index in 90" :key="index.id" class="number" :class="[{ 'disabled': !numbers.includes(index) }]" >
            {{ index }}
          </div>
        </div>

        <button @click="handleButtonClick" :disabled="numbers.length == 90" >aaaaaaaaaa</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { generateUniqueNumber } from "../../utils/number.js";
import BingoCard from "./BingoCard.vue";
const props = defineProps({});
const emit = defineEmits([]);

const numbers = ref([]);

function handleButtonClick() {
  let uniqueNumber = generateUniqueNumber(90, 1, numbers.value);
  if (uniqueNumber) {
    numbers.value.push(uniqueNumber);
  }
  else {
    const missingNumber = numbers.value.toSorted((a, b) => a - b).filter((item, index) => item - 1 != index)[0] - 1
    numbers.value.push(missingNumber);
  }
}

</script>

<style scoped>
.bingo-cards {
  margin-inline-end: auto;
}
.last-number {
  text-align: center;
  font-size: 3rem;
}
.numbers {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 1rem;
}
.number {
  border: 1px solid;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  width: 1rem;
  height: 1rem;
}
.number.disabled {
  opacity: 0.4;
}
</style>