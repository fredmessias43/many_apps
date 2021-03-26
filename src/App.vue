<template>
  <div id="app">
    <!-- {{ trans.getTranslation('keyboard') }} -->

    <Search />
  </div>
</template>

<script>
// import Translation from "./utils/translation/trans.model"
// import generator from "./utils/perfilGenerator"
import Search from "./components/Search"
export default {
  name: 'App',
  data(){
    return {
      // trans: new Translation('pt_BR')
    }
  },
  components: {Search},
  created(){
    // console.log( generator('Fredeico Messias') );
  }
}
</script>

<style>
</style>
