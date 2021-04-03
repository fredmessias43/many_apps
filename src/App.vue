<template>
  <div id="app">
    <div id="nav">
      <router-link to="/search">Search Users</router-link> |
      <router-link to="/json-csv">json to csv</router-link> |
      <router-link to="/csv-json">csv to json</router-link> |
      <router-link to="/perfil-generator">Perfil Generator</router-link> |
      <router-link to="/elevator">Elevator</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style>
.container {
    margin: 0 auto;
    max-width: 1080px;
}
.row{
  display: flex;
}
.row .col {
  flex: 1;
}
.flex-all {
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapper {
    display: flex;
    flex-direction: column;

    margin: 1rem auto;
    max-width: 760px;
}
</style>
