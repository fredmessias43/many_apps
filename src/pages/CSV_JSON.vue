<template>
    <div class="container">
        <h1>Converter CSV - JSON</h1>

        <div class="wrapper">
            <label>Input a file</label>
            <input  type="file" accept=".json" @change="handleFile">
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
            var all = this.text.split('\n');
            var headers = all[0].split(',');
            var bodies = all.splice(1, Number.MAX_VALUE);

            this.output = bodies.map((b)=>{
                var body = b.split(',');
                return mergeObejct(headers,body);
            });
        },
        copy() {
            var copyText = document.getElementById("myInput");
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
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    max-width: 1080px;
}
.wrapper {
    display: flex;
    flex-direction: column;

    margin: 1rem 0;
}
</style>