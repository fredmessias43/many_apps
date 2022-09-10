<template>
  <div>
    {{ hours +'=='+ resolveHoursAngle(hours) }} -----
    {{ minutes +'=='+ resolveMinutesAngle(minutes) }} -----
    {{ seconds +'=='+ resolveSecondsAngle(seconds) }}


    <div class="clock" >
      <div class="numbers-wrapper" >
        <div 
          class="numbers" 
          v-for="i in 12" 
          :style="{
            transform: 'rotate('+ resolveNumbersAngle(i) +'deg)'
          }" 
        >{{i}}</div>
      </div>

      <div class="pointers" >
        <div class="pointer hours" :style="{transform: 'rotate('+ resolveHoursAngle(hours, minutes, seconds) +'deg)'}" ></div>
        <div class="pointer minutes" :style="{transform: 'rotate('+ resolveMinutesAngle(minutes, seconds) +'deg)'}" ></div>
        <div class="pointer seconds" :style="{transform: 'rotate('+ resolveSecondsAngle(seconds) +'deg)'}" ></div>
      </div>

    </div>
  </div>
</template>

<script setup>import { computed, onDeactivated, onMounted, ref, watch } from 'vue';

const interval = ref(-1);
const date = ref(new Date());
const hours = ref(new Date().getHours());
const minutes = ref(new Date().getMinutes());
const seconds = ref(new Date().getSeconds());

function resolveNumbersAngle(value) {
  return  (value * 30) ;
}
/* TODO: Add minutes variation on angle in hours */
/* TODO: same in minutes */
function resolveHoursAngle(hours = 1, minutes = 1, seconds = 1) {
  const inHour = hours <= 12 ? hours : hours - 12;
  return (inHour * 30);
}
function resolveMinutesAngle(minutes = 1, seconds = 1) {
  return (minutes * 6);
}
function resolveSecondsAngle(seconds = 1) {
  const value = seconds * 6;
  return value < 6 ? 360 : value;
}

watch(
  () => date.value,
  () => {
    hours.value = date.value.getHours();
    minutes.value = date.value.getMinutes();
    seconds.value = date.value.getSeconds();
  }
)

onMounted(() => {
  interval.value = setInterval(() => {
    date.value = new Date();
  }, 1);
});
onDeactivated(() => {
  clearInterval(interval.value);
});
</script>

<style scoped>
.clock {
  position: relative;

  border: 10px solid black;

  border-radius: 50%;

  --clock-size: 50vw;

  height: var(--clock-size);
  width: var(--clock-size);
}

.numbers-wrapper {
  position: absolute;
  top: 50%;
  right: 50%;
}
.numbers {
  position: absolute;
  height: calc(var(--clock-size) / 2 - 2rem);
  width: 1rem;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  transform-origin: bottom;
  bottom: 100%;
}
.pointers{
  position: absolute;
  top: 50%;
  right: 50%;
}
.pointer {
  position: absolute;
  transform: translateX(-50%);
  transform-origin: bottom;
  transition: transform 0.1s ease-out;
  bottom: 100%;
}
.pointer.hours {
  width: 20px;
  height: calc(var(--clock-size) / 4);
  background-color: black;
}
.pointer.minutes {
  width: 10px;
  height: calc(var(--clock-size) / 3);
  background-color: black;
}
.pointer.seconds {
  width: 5px;
  height: calc(var(--clock-size) / 3);
  background-color: red;
}
</style>