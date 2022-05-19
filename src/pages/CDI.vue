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


    <table>
      <thead>
        <tr>
          <td>mes</td>
          <td>anterior</td>
          <td>cdi</td>
          <td>calculado</td>
          <td>adicionado</td>
          <td>total por mês</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in totalArray" >
          <td> {{ t.date.split("/")[1] +"/"+ t.date.split("/")[2].substring(2) }}</td>
          <td> {{ t.previousTotal }}</td>
          <td> {{ t.cdi }}%</td>
          <td> + {{ t.evaluated }}</td>
          <td> + {{ t.perMonth }}</td>
          <td> {{ t.total }}</td>
        </tr>
      </tbody>
      <tfoot v-if="total" >
        <tr>
          <td colspan="3" ></td>
          <td> + {{ totalArray.reduce((e,f) => Number(e) + Number(f.evaluated), 0).toFixed(3) }} </td>
          <td> + {{ ( totalArray.reduce((e,f) => Number(e) + Number(f.perMonth), 0) - initialValue).toFixed(3)  }} </td>
          <td> {{ total }} </td>
        </tr>
      </tfoot>
    </table>

  </div>


</template>

<script>
export default {
  data(){
    return {
      bankPercentage: 100,
      cdi: 0.5,
      initialValue: 100,
      valuePerMonth: 100,
      dataInicial: "2021-01-02",
      dataFinal: "2022-01-01",

      total: "",
      totalArray: []
    }
  },
  computed: {
    //total() {
    //  return this.initialValue *  ( this.cdi * auxBankPerc / 100 )
    //}
  },
  methods: {
    async getCDI() {
      // const codigo_serie = 11; // acumulada por dia
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
      this.totalArray = [];

      let pseudoTotal = 0;
      let cdiPerMonth = await this.getCDI();
      // console.log(cdiPerMonth);

      const firstCdi = cdiPerMonth[0].valor;
      const firstDate = cdiPerMonth[0].data;

      pseudoTotal = Number(this.initialValue);

      this.totalArray.push({
        value: pseudoTotal,
        text: (pseudoTotal.toFixed(3)).toString(),
        date: firstDate,

        cdi: firstCdi,
        previousTotal: 0,
        evaluated: 0,
        evaluatedTotal: pseudoTotal.toFixed(3),
        perMonth: pseudoTotal.toFixed(3),
        evaluatedTotalAfterMonthValue: pseudoTotal.toFixed(3),
        total: pseudoTotal.toFixed(3),
      });

      // calcular com o array
      for (let i = 0; i < cdiPerMonth.length; i++) {
        const cdi = cdiPerMonth[i].valor;
        const date = cdiPerMonth[i].data;

        const previousTotal = pseudoTotal;

        const evaluated = this.cdiCalc( pseudoTotal, this.bankPercentage, cdi );
        const evaluatedTotal = pseudoTotal + evaluated;
        const evaluatedTotalAfterMonthValue = cdiPerMonth.length === 1 ? evaluatedTotal : evaluatedTotal + Number(this.valuePerMonth);
        
        pseudoTotal = evaluatedTotalAfterMonthValue;

        this.totalArray.push({
          text: `${evaluatedTotal.toFixed(3)} + ${this.valuePerMonth} = ${pseudoTotal.toFixed(3)}` ,
          date: date,
          cdi,

          previousTotal: previousTotal.toFixed(3),
          evaluated: evaluated.toFixed(3),
          evaluatedTotal: evaluatedTotal.toFixed(3),
          perMonth: cdiPerMonth.length === 1 ? 0 :this.valuePerMonth.toFixed(3),
          evaluatedTotalAfterMonthValue: evaluatedTotalAfterMonthValue.toFixed(3),
          total: pseudoTotal.toFixed(3),
        });
      }

      this.total = pseudoTotal.toFixed(3);
    },
    cdiCalc( value, percentage, cdi ) {
      // 500 * ( ( 1.01 * 0.83 ) / 100 )
      const auxPercentage = percentage / 100;
      return value * ( ( auxPercentage * cdi ) / 100 )
    }
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;

}
td {
  padding-top: 20px;
  border-bottom: 1px solid;
}
</style>