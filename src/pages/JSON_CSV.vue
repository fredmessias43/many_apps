<template>
    <div class="container">
        <h1>Converter JSON - CSV</h1>

        <div class="wrapper">
            <label>Input a file</label>
            <input type="file" accept=".json" @change="handleFile">
        </div>
        <h1>OR</h1>
        <div class="wrapper" > 
            Input um JSON para Converter 
            <textarea rows="15" v-model="text" ></textarea>
            <button @click="convert" > Converter JSON em CSV</button>
        </div>


        <div class="wrapper" >
            <textarea rows="15" id="myInput" v-model="output" ></textarea>
            <button @click="copy" > Copy to clipBoard </button>
        </div>
    </div>
</template>

<script>
import getDeepKeys from '../utils/object/getDeepKeys';
import getDeepValues from '../utils/object/getDeepValues';

export default {
    data(){
        return {
            text: '',
            output: ''
        }
    },
    methods: {
        convert(){
            let textArr = JSON.parse(this.text);
            const headers = textArr.map((t) =>{
               return getDeepKeys(t);
            })[0].join(',');

            const bodies = textArr.map((t) => {
                return getDeepValues(t).join(',');
            })

            bodies.unshift(headers);
            
            this.output = bodies.join('\n');
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