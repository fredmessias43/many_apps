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

<script>
import mergeObejct from '../utils/mergeObject';
export default {
    data(){
        return {
            text: '',
            file: '',
            output: '',
        }
    },
    methods: {
        convert(){
            let all = this.text.split("\n");
            let headers = all[0].split(',');
            let bodies = all.splice(1, Number.MAX_VALUE);

            this.output = bodies.map((b)=>{
                let body = b.split(',');
                return mergeObejct(headers,body);
            });
            this.output = JSON.stringify(this.output)
        },
        copy() {
            let copyText = document.getElementById("myInput");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
        },
        handleFile(e){
            const reader = new FileReader();
            const selectedFile = e.target.files[0];

            reader.addEventListener('load',()=>{
                this.text = reader.result;
            });

            reader.readAsText(selectedFile);
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
}
</script>

<style>
</style>