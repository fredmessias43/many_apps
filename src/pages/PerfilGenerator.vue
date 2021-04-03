<template>
  <div class="container">
      <h1> Perfil Generator </h1>
      <div class="wrapper">
          <label>Input yyour name</label>
          <input v-model="name" >
          <button @click="generate" >generate</button>
      </div>

        <div class="row">
            <div class="wrapper col  flex-all svg-display">
                <svg height="100" width="100" ref="svg_image" >
                    <circle cx="50" cy="50" r="50" :fill="colorBack" />
                    <text x="50" y="63" font-size="35" text-anchor="middle" :fill="colorFont"> {{output}} </text>
                </svg> 

                <div class="btn-list">
                    <button  @click="downloadSVG"> Baixar em svg </button>
                    <!-- <button  @click="downloadPNG"> Baixar em png </button> -->
                </div>
            </div>

            

            <div class="wrapper box col flex-all ">
                <label>Choose background color</label>
                <input type="color" v-model="colorBack">

                <div class="divider-vertical"></div>   

                <label>Choose font color</label>
                <input type="color" v-model="colorFont">

                <div class="divider-vertical"></div>

                <label>Choose font</label>
                <input type="text" v-model="fontfamily">

            </div>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            name: 'fred messias',
            colorBack: '#fff',
            colorFont: '#23525',
            fontfamily: 'Ubuntu',
        }
    },
    computed:{
        output(){
            let name = this.name.length > 1 ? this.name : 'EX';  
            name = name.trim();
            if(name.includes(' ') ){
                const [first_name, last_name] = name.split(' ');
                return first_name[0].toUpperCase()+last_name[0].toUpperCase();
            }
            else {
                return name[0].toUpperCase()+name[1].toUpperCase();
            }
        }
    },
    methods:{
        generate(){
            
        }, 
        download(file_name){
            const svg = this.$refs.svg_image;
            const svg_xml = new XMLSerializer().serializeToString(svg);

            let myBlob = new Blob([svg_xml], { type: 'image/svg+xml'  }); // o blob
            const link = window.document.createElement('a');
            link.href = window.URL.createObjectURL( myBlob );
            link.download = file_name;
            link.click();
            window.URL.revokeObjectURL(link.href);
        },
        downloadSVG(){
            this.download(`photo_of_${this.name}.svg`)
            console.log('downloadSVG')
        },
        downloadPNG(){
            this.download(`photo_png_of_${this.name}.png`)
            console.log('downloadPNG')
        },
        
    }
}
</script>

<style>
.btn-list {
    margin: 1rem 0;
}
svg text {
    font-family: sans-serif;
}
</style>