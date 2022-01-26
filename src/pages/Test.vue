<template>
  <h1>{{ dataObj }}</h1>
  <h1>{{ fred }}</h1>
</template>

<script setup >
import { reactive, ref, toRef } from 'vue';

const data = ref("fred");
const dataObj = reactive({
  fred: 'fred',
  data: data
});

const { fred } = toRef(dataObj)

dataObj.fred = "fred 3"
dataObj.data = 'aaaaaaa'
</script>