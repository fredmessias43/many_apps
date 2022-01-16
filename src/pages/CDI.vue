<template>

  <div class="container">
    <form @submit.prevent="calculateCDI" >
<!--       <div class="wrapper">
        <label> Valor do CDI </label>
        <input type="number" min="0.01" v-model="cdi" >
      </div> -->
      
      <div class="wrapper">
        <label> Porcentagem do CDI fornecida pelo banco </label>
        <input type="number" min="100" max="300" v-model="bankPercentage" >
      </div>

      <div class="wrapper">
        <label> Valor investido inicial </label>
        <input type="number" min="1" v-model="initialValue" >
      </div>
      
      <div class="wrapper">
        <label> Valor investido por mês</label>
        <input type="number" min="0" v-model="valuePerMonth" >
      </div>

      <div class="wrapper">
        <label> data Inicial </label>
        <input type="date" v-model="dataInicial" >
      </div>
      <div class="wrapper">
        <label> data Final </label>
        <input type="date" v-model="dataFinal" :max="new Date(Date.now()).toISOString().substring(0, 10)" >
      </div>

      <input type="submit" value="Manda ver!" />
    </form>


    {{ total }}
  </div>


</template>

<script>
export default {
  data(){
    return {
      bankPercentage: 100,
      cdi: 0.5,
      initialValue: 100,
      valuePerMonth: 0,
      dataInicial: "2020-01-10",
      dataFinal: "2020-02-10",

      total: ""
    }
  },
  computed: {
    //total() {
    //  return this.initialValue *  ( this.cdi * (this.bankPercentage / 100) / 100 )
    //}
  },
  methods: {
    async getCDI() {
      //const codigo_serie = 11; // acumulada por dia
      const codigo_serie = 4390; // acumulada por mes
      const dataInicial = new Date(this.dataInicial).toLocaleDateString('pt-BR');
      const dataFinal = new Date(this.dataFinal).toLocaleDateString('pt-BR');

      const res = await fetch(
        `http://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo_serie}/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`
      );

      return await res.json();
    },
    async calculateCDI()
    {
      let pseudoTotal = 0;
      let cdiPerMonth = await this.getCDI();
      console.log(cdiPerMonth);

      const firstCDI = cdiPerMonth[0].valor;
      
      pseudoTotal = Number(this.initialValue);
      pseudoTotal += this.initialValue *  ( firstCDI * (this.bankPercentage / 100) / 100 );

      // calcular com o resto do array
      /* const deletedItems = */ cdiPerMonth.splice(0, 1);
      for (let i = 0; i < cdiPerMonth.length; i++) {
        const cdi = cdiPerMonth[i].valor;

        pseudoTotal = pseudoTotal + Number(this.valuePerMonth);
        pseudoTotal += pseudoTotal * ( cdi * (this.bankPercentage / 100) / 100 );
        
      }

      this.total = pseudoTotal.toFixed(3);
    }
  }
}
</script>

<style>

</style>