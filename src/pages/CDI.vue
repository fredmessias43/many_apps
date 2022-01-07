<template>

  <div class="container">
    <form>
      <div class="wrapper">
        <label> Valor do CDI </label>
        <input type="number" min="0.0001" max="2" v-model="cdi" >
      </div>
      
      <div class="wrapper">
        <label> Porcentagem do CDI fornecida pelo banco </label>
        <input type="number" min="100" max="300" v-model="percentage" >
      </div>

      <div class="wrapper">
        <label> Valor investido inicial </label>
        <input type="number" v-model="initialValue" >
      </div>
      
      
      <div class="wrapper">
        <label> Valor investido por mês</label>
        <input type="number" v-model="valuePerMonth" >
      </div>


    </form>


    {{ total }}
  </div>


</template>

<script>
export default {
  data(){
    return {
      percentage: 100,
      cdi: 0.5,
      initialValue: 1,
      valuePerMonth: 1,
      dataInicial: "",
      dataFinal: ""
    }
  },
  computed: {
    total() {
      return this.initialValue *  ( this.cdi * (this.percentage / 100) / 100 )
    }
  },
  methods: {
    getCDI() {
      const codigo_serie = 11;
      fetch(
        `http://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo_serie}/dados?formato=json&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}`
      )
      .then(response => response.json())
      .then(data => console.log(data));
    }
  }
}
</script>

<style>

</style>