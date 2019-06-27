<template>
    <div  class="login">
        <div style="clear:both;"></div>
            <button class="btn"  @click="soap">soap</button>
            <div v-for="(image,index) in image64" :key="index">
              <img v-bind:src="image"/>
            </div>
            
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'ShowData',
        data(){
            return{
                name:"",
                email:"dsgantivac@unal.edu.co",
                password:"12345678",
                token:"",
                someData: [],
                upload: [],
                showCreateFolder: false,
                showOptions: false,
                folderOptionName: "",
                image64:[],
                folderName: "",
                MoveToShow: false,
                number: 1,
                advise:"",
                user_files:[],
                current_path:[],
                moveReturn: [],
                possiblePaths: [],
                fileOrigin: "",
                fileDestiny: "",
                //hostname: "http://192.168.99.101:5000/graphql"
                hostname: "http://35.237.206.16:2870/graphql"
            }
        },
        methods: {
            async soap (){
                const res = await axios.post(this.hostname, {
                query:`
                mutation{
                  soapConsume(
                    soap:{
                      username:"daescobarp"
                    }
                ){
                  data{
                    image_base64
                  }
                }
                }`
        })
                console.log(res.data.data.soapConsume.data.length)
                let imagebase64= res.data.data.soapConsume.data
                for(let i=0;i<imagebase64.length;i++){
                this.image64.push(imagebase64[i].image_base64)
                }
                
                /*
                let prueba= "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4Njc4OTc4NDJEMzUxMUUzOTFBM0I3RjJCMjVEOEI2RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4Njc4OTc4NTJEMzUxMUUzOTFBM0I3RjJCMjVEOEI2RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg2Nzg5NzgyMkQzNTExRTM5MUEzQjdGMkIyNUQ4QjZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg2Nzg5NzgzMkQzNTExRTM5MUEzQjdGMkIyNUQ4QjZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mX0bwAAAAL9JREFUeNpsz78LgUEcx/F7OIOUUga7Tf4LJaWsZvWUXTZRSlJYKAazbIqyK4t/wKiUgcGkSH6/v3VyxadeXU/3uXu+57jLmDIJIowdrhgi+9n0wIcuDlijigf6eH2KGhXk0MEZDSQwgYOnXChFFzMUzeEUxvCbg2nkpRjBXX0Tt0oZzLHQ6jctM9tKCqihru2BrbTNWkAJI3n1BgH1PyHcsNXmV/LiKS5WyYskBjhKsYcTyohaxb3MhqZ8vAUYAP8OKf0qLt2tAAAAAElFTkSuQmCC"
                for(let i=0;i<5;i++){
                this.image64.push("data:image/jpeg;base64,"+prueba)
                }
*/
                
            }
            ,

        },
    }

</script>

<style scoped src='../styles/Data.css' >

</style>

<!--
https://stackoverflow.com/questions/49587831/how-to-append-files-and-data-to-formdata-in-vue-js

var files=[fs.createReadStream('/home/diego/Imágenes/test.png')]
    var options = {
      method: 'POST',
      url: 'http://localhost:5000/graphql',
      headers:
        { 'Content-Type': 'multipart/form-data' },
      formData:
      {
        operations: '{ "query": "mutation($uploads: [Upload!]!){\\n  uploadFiles(files:{\\n    uploads:$uploads\\n    name: \\"graphql\\"\\n    description:\\"prueba gql\\"\\n    owner: \\"diegun\\"\\n  },input:{email:\\"unemail2@gmail.com\\"\\n token: \\"QnIcrnWpvU\\"})\\n  {\\n    name\\n description\\n owner\\n path\\n advise\\n  }\\n}\\n", "variables": { "uploads": '+ files+'} }'
      }
    };


    curl http://192.168.99.101:5000/graphql   -F operations='{ "query": "mutation($uploads: [Upload!]!){\n  uploadFiles(files:{\n    uploads:$uploads\n    name: \"graphql\"\n    description:\"prueba gql\"\n    owner: \"david\"\n  },input:{email:\"dsgantivac@unal.edu.co\"\n token: \"BdDuQjgGnW\"})\n  {\n    name\n description\n owner\n path\n advise\n  }\n}\n", "variables": { "uploads": [null] } }'   -F map='{ "0": ["variables.uploads.0"] }'   -F 0=@/home/gantiva/Downloads/logoFinal.jpg





-->