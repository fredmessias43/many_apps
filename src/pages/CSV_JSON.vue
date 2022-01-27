<template>
    <div class="container">
        <h1>Converter CSV - JSON</h1>

        <div class="wrapper">
            <label>Input a file</label>
            <input  type="file" accept=".csv" @change="handleFile">
        </div>
        <h1>OR</h1>
        <div class="wrapper"> 
            Input um CSV para Converter 
            <label >
              Selecione um tipo de separador
              <select v-model="spliter">
                <option value="auto" >auto-detect</option>
                <option value="," >Virgula</option>
                <option value=";" >Ponto e Virgula</option>
                <option value="\n" >Quebra de linha</option>
              </select>
            </label>
            <textarea rows="15" v-model="text" ></textarea>
            <button @click="convert" > Converter CSV em JSON</button>
        </div>
        
        <div class="wrapper" >
            <textarea rows="15" id="myInput" v-model="output" ></textarea>
            <button @click="copy" > Copy to clipBoard </button>
            <button @click="download" > gerar link de download </button>
        </div>
    </div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue';
import mergeObejct from '../utils/mergeObject';
export default defineComponent({
    data(){
        return {
            text: '',
            file: '',
            output: '',
            spliter: ';'
        }
    },
    methods: {
        convert(){
            let all = <string[]>[];
            let headers = <string[]>[];
            let bodies = <string[]>[];

            if (this.spliter === ';' || this.spliter === ',') {
              all = this.text.split(this.spliter);

              console.log(all.length);
              headers = all[0].split(',');
              bodies = all.splice(1, all.length + 1);
            }
            if (this.spliter === '\n') {
              all = this.text.split(this.spliter);
              console.log(all.length);
              headers = all[0].split(',');
              bodies = all.splice(1, all.length + 1);              
            }

            this.output = JSON.stringify(bodies.map((b)=>{
                let body = b.split(',');
                return mergeObejct(headers,body);
            }));
        },
        copy() {
            let copyText = document.querySelector<HTMLTextAreaElement>("#myInput");
            copyText?.select();
            copyText?.setSelectionRange(0, 99999);
            document.execCommand("copy");
        },
        handleFile(e: any){
            const reader = new FileReader();
            const selectedFile = e.target.files[0];

            reader.readAsText(selectedFile, 'utf-8');

            reader.addEventListener('load',()=>{
                this.text = JSON.stringify(reader.result);
            });
        },
        download(){
            //let blobParts = ['{"nome":"Rodrigo","sobrenome":"Aramburu"}'];
            let myBlob = new Blob([this.output], {type : 'json/application'}); // o blob
            console.log(JSON.parse(this.output));
            const link = window.document.createElement('a');
            link.href = window.URL.createObjectURL( myBlob );
            link.download = 'csv_to_json.json';
            link.click();
            window.URL.revokeObjectURL(link.href);
        }
    }
})
</script>

<style>
</style>