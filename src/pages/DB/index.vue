<template>
  <div class="container">
    <h1> DB </h1>

    <div class="wrapper btn-list">
      <button @click="LoadDB" >Load DB</button>
      <button @click="QueryAllDB" >Query All DB</button>
      <button @click="ClearDB" >Clear DB</button>
    </div>

    <div class="notification-panel">
      <div class="panel">
        <div 
          class="log"
          v-for="(log, i) in logs"
          :key="i"
        >
          $ {{ log.message }}
            <table v-if="log.data">
              <thead>
                <tr>
                  <td v-for="(val,key) in log.data" :key="key" > {{ key }}: </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="(val,key) in log.data" :key="key" > {{ val }} </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initialLoad, LoadDB, queryDB, clearDB }  from "./Customer";

export default {
  data(){
    return {
        logs: [
          { message: "DB initialized!", type: 'normal'},
        ]
    }
  },
  created(){
    initialLoad()
  },
  methods: {
      LoadDB(){
          const data = { name: 'fred', mail: 'email@email.com'  }
          LoadDB(data);
           //push logs
          this.logs.push({message: 'Load DB called', type: 'load', data});
      },
      QueryAllDB(){
          const data = queryDB();
          this.logs.push({ message: 'Query DB called', type: 'query', data })
      },
      ClearDB(){
          clearDB();
          this.logs.push({ message: 'Clear DB called', type: 'clear' })
      },
  }
}
</script>

<style>
.btn-list {
  flex-direction: row;
  justify-content: space-evenly;
}

.notification-panel {
    height: 320px;
    width: 100%;
    border:2px solid #666;
    background: #333333;
    scrollbar-color: #b2b2b2 transparent;  
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
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

</style>