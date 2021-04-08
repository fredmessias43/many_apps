<template>
  <div class="container">
      <h1>Elevator</h1>
      <div class="floor" v-for="(floor,i) in reverse(floors)" :key="floor.id" :class="{passing : floor.isPassing}" >
          <div class="doors" :class="{open : floor.isHere}" >
              <div class="door"></div>
              <div class="door"></div>
          </div>
          <div class="btns">
              <div class="numered-btns" >
                  <button class="number" v-for="n in floors.length" :key="n" >{{n}}</button>
              </div>
              <div class="up-down-btns">
                <button v-if="i !== 0" @click="up(floor.id)">↑</button>
                <button v-if="i+1 !== floors.length" @click="down(floor.id)">↓</button>
              </div>
          {{floor.id}}
          </div>
      </div>

      <pre>
          {{queue}}
      </pre>

      <pre class="pre-f">
          {{reverse(floors)}}
      </pre>
  </div>
</template>

<script>
export default {
    data(){
        return {
            floors: [
                {id: 0,isHere: true,isPassing: false,},
                {id: 1,isHere: false,isPassing: false,},
                {id: 2,isHere: false,isPassing: false,},
                {id: 3,isHere: false,isPassing: false,},
            ],
            call: {},
            queue: [],
        }
    },
    methods:{
        up(i){
            this.call = {floor: i,direction:'up'}
        },
        down(i){
            this.call = {floor: i,direction:'down'}
        },
        reverse (array) {
            return array.slice().reverse()
        }

    },
    watch:{
        call(newCall,oldCall){    
            this.floors.forEach((floor,i)=>{
                setTimeout(() => {
                    floor.isHere = (i === newCall.floor);
                    //floor.isPassing = (i === newCall.floor);
                }, 2000);
            })
            this.queue.push(newCall);
            console.log(oldCall);
        }
    },
}
</script>

<style>
button {
    cursor: pointer;
}
pre {
    position: absolute;
    top: 0;
    left: 34px;
}
.pre-f{
    left: 200px;
}
.floor{
    border: 1px solid #b2b2b2;
    display: grid;
    grid-template-columns: 3fr 1fr;
    place-content: end;

    max-width: 34rem;
    margin: 0 auto;
    height: 15rem;

    position: relative;
}

.passing.floor::after{
    content: "";
    position: absolute;
    background: red;
    top: 20px;
    left: 50px;
    width: 20px;
    height: 20px;
}

.doors{
    height: 11rem;
    border: 1px solid;
    width: 20rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    transition: all 0.2s ease-in-out;
}

.door:nth-child(1),
.door:nth-child(2){
    height: 10.9rem;
    border: 1px solid;
    width: 10rem;
}

.open .door:nth-child(1) {
    width: 1rem;
}
.open .door:nth-child(2){
    width: 1rem;
}

.btns{
    justify-content: flex-start;
    display: flex;
    align-items: center;
}

.numered-btns {
    margin: 1rem 1rem;
    display: flex;
    flex-direction: column;
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