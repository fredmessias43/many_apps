<template>
  <div id="app">
    {{ trans.getTranslation('keyboard') }}
  </div>
</template>

<script>
import Translation from "./translation/trans.model"

export default {
  name: 'App',
  data(){
    return {
      trans: new Translation('pt_BR')
    }
  },
  created(){
    console.log( this.trans.getTranslation('caixa') );
  }
}
</script>

<style>
</style>
