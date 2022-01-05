<template>
  <div id="app">
    <header>
      <nav id="nav">
        <router-link to="/search">Search Users</router-link> |
        <router-link to="/json-csv">json to csv</router-link> |
        <router-link to="/csv-json">csv to json</router-link> |
        <router-link to="/perfil-generator">Perfil Generator</router-link> |
        <router-link to="/elevator">Elevator</router-link> |
<!--         <router-link to="/first-db">First DB</router-link> |
        <router-link to="/bash">Bash</router-link> | -->
      </nav>
    </header>
    <main>
      
      <router-view/>

    </main>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
button {
  cursor: pointer;
}

#app {
  padding: 1.5rem;
}

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
