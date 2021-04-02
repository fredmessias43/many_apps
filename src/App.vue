<template>
  <div id="app">
    <div id="nav">
      <router-link to="/search">search</router-link> |
      <router-link to="/json-csv">json to csv</router-link> |
      <router-link to="/csv-json">csv to json</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>
