<template>
  <div class="container">
      <h1> Bash </h1>

      <div class="bash">
        <div class="panel">
          <div 
            class="log"
            v-for="(log,key) in logs"
            :key="key"
          >
          $ {{ log.value }}
          </div>
          <div class="input">
            $ <input v-model="message" @change="logger" >
          </div>
        </div>
      </div>
      <!-- 
          Make a bash app in html


       -->
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(){
    const logs = ref([]);
    const message = ref('');
    const commands = {
      clear: () => {
        logs.value = []
      },
      safe: () => {
        logs.value.push({value: 'safe 44'})
      }
    }

    function logger(){
      logs.value.push({
        value: message.value
      })
      
      if(commands[message.value]){
        commands[message.value]()
      }
      message.value = '';
    }
    
    return {
      logger,
      logs,
      message
    }
  }
}
</script>

<style>
.bash {
    height: 320px;
    width: 100%;
    border:2px solid #666;
    background: #333333;
    scrollbar-color: #b2b2b2 transparent;  
}

.panel {
    height: 320px;
    width: 100%;
    padding:10px;
    overflow: auto;
}

.log {
  color: aliceblue;
  font-family: monospace;
}

.input {
  color: aliceblue;
}

.input input {
  border: 0;
  background: transparent;
  outline: none;
}
</style>