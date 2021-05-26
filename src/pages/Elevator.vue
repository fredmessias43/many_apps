<template>
  <div class="container">
    <h1>Elevator</h1>
    <div
      class="floor"
      v-for="(floor, i) in reverse(floors)"
      :key="floor.id"
      :class="{ passing: floor.isPassing }"
    >
      <div class="doors" :class="{ open: floor.isHere }">
        <div class="door"></div>
        <div class="door"></div>
      </div>
      <div class="btns">
        <div class="numered-btns" :class="{ appear: floor.isHere }">
          <button
            class="number"
            v-for="n in floors.length"
            :key="n"
            :disabled="!floor.isHere || n === floor.id + 1"
            @click="goToFloor(n, floor.id + 1)"
          >
            {{ n }}
          </button>
        </div>
        <div class="up-down-btns">
          <button 
            v-if="i !== 0" 
            @click="up(floor.id)" 
            :disabled="floor.isHere"
          >
            ↑
          </button>
          <button
            v-if="i + 1 !== floors.length"
            @click="down(floor.id)"
            :disabled="floor.isHere"
          >
            ↓
          </button>
        </div>
        {{ floor.id + 1 }}
      </div>
    </div>

    <pre>
      {{ queue }}
      {{ actual_floor }}
    </pre>

    <!--     
      <pre class="pre-f">
        {{ reverse(floors) }}
      </pre> 
    -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      floors: [
        { id: 0, isHere: true, isPassing: false },
        { id: 1, isHere: false, isPassing: false },
        { id: 2, isHere: false, isPassing: false },
        { id: 3, isHere: false, isPassing: false }
      ],
      actual_floor: 0,
      call: {},
      queue: []
    };
  },
  methods: {
    up(i) {
      this.call = { floor: i, direction: "up", from: this.actual_floor, to:  i + 1};
    },
    down(i) {
      this.call = { floor: i, direction: "down", from: this.actual_floor, to: i + 1};
    },
    goToFloor(to, from) {
      let direction = to > from ? "up" : "down";
      this.call = { floor: to - 1, direction: direction, from: from, to: to};
    },
    reverse(array) {
      return array.slice().reverse();
    }
  },
  watch: {
    call(newCall, oldCall) { 
      this.floors.forEach((floor, i) => {
        setTimeout(() => {
          floor.isHere = i === newCall.floor;
        }, 1000 * 3);
      });
      this.actual_floor = newCall.floor;
      this.queue.push(newCall);
      console.log(oldCall);
    }
  }
};
</script>

<style scoped>
button {
  cursor: pointer;
}
button:disabled {
  cursor: auto;
}
pre {
  position: absolute;
  top: 6rem;
  left: 34px;
}
.pre-f {
  left: 200px;
}
.floor {
  border: 1px solid #b2b2b2;
  display: grid;
  grid-template-columns: 3fr 1fr;
  place-content: end;

  max-width: 34rem;
  margin: 0 auto;
  height: 15rem;

  position: relative;
}

.passing.floor::after {
  content: "";
  position: absolute;
  background: red;
  top: 20px;
  left: 50px;
  width: 20px;
  height: 20px;
}

.doors {
  height: 11rem;
  border: 1px solid;
  width: 20rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  transition: all 0.2s ease-in-out;
}

.door:nth-child(1),
.door:nth-child(2) {
  height: 10.9rem;
  border: 1px solid;
  width: 10rem;
}

.open .door:nth-child(1) {
  width: 1rem;
}
.open .door:nth-child(2) {
  width: 1rem;
}

.btns {
  justify-content: flex-start;
  display: flex;
  align-items: center;
}

.numered-btns {
  opacity: 1;
  margin: 1rem 1rem;
  display: flex;
  flex-direction: column;
}

.numered-btns.appear {
  opacity: 1;
}

.number {
  border-radius: 50%;
  border: 1px solid;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 1.2rem;
  height: 1.2rem;
}

.up-down-btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
