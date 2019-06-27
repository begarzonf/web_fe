<template>
    <div  class="login">
        <h1>Bienvenido {{name}} &#129299;</h1>
        <h2 style="margin-bottom:30px;">{{email}}</h2>

        <div v-if="current_path.length > 1">
            <button class="btn" style="float:left" @click="popCurrentPath" >Retroceder</button>
        </div>
        <div style="clear:both;" ></div>

        <!--Start folders and files generation-->
            <div  v-for="(elements, index) in current_path[current_path.length-1]" :key="index" class="listContainer">
                <div class="folder-container" height="120px">

                    <div v-if="checkDot(elements.name)">
                        <div @click="getDownload(elements.path)">
                            <div v-if="getExtension(elements.name) == 'txt' ">
                                <img height="120px" src="../assets/txt.png" >
                            </div>
                            <div v-else-if="getExtension(elements.name) == 'pdf' ">
                                <img height="120px" src="../assets/pdf.png" >
                            </div>
                            <div v-else>
                                <img height="140px" src="https://img.icons8.com/cotton/100/000000/open-document.png" >
                            </div>
                            <div class="centered">{{addDot(elements.name)}} </div>
                        </div>

                    </div>

                    <div v-if="!checkDot(elements.name)">
                        <div @click="moveTo(elements.files)">

                            <i class="material-icons" style="font-size:140px;color:gray">folder</i>
                            <div class="centered"  >{{addDot(elements.name)}} </div>
                        </div>
                    </div>
                    <span @click="getOptions(elements.name,elements.path)"  class="glyphicon glyphicon-option-horizontal bottom-right-image" ></span>
                </div>
            </div>

        <!--End folders and files generation-->

        <div style="clear:both;"></div>

        <div class="OptionCard" v-if="showOptions">
            <div class="cardContent" style="height:330px" >
                <div class="cardTitle" >
                    Opciones de {{addDot(folderOptionName)}}
                </div>

                <h3>{{advise}}</h3>
                <div v-if="!MoveToShow" >
                    <button class="btn" @click="ShowMoveFile">Mover </button><br/>
                    <button class="btn" @click="deleteFile">Eliminar </button><br/>
                    <button class="btn" @click="hideOption">Cancelar </button>
                </div>
                <!-- AQUI SE HACE EL MOVER LAS CARPETAS DE MONDA-->

                <div v-if="MoveToShow" >
                    <p>Selecciona la carpeta destino</p><br/>
                    <select v-model="fileDestiny">
                        <option v-if="current_path.length > 1 ">
                            Extraer de la carpeta
                        </option>
                        <option v-for="(item, index) in possiblePaths" :key="index">
                                {{item}}
                        </option>

                    </select>
                    <br/>
                    <button class="btn" @click="moveFile">Mover </button>
                    <button class="btn" @click="ShowMoveFile">Cancelar </button>
                </div>
            </div>
        </div>

        <div class="createCard" v-if="showCreateFolder" >
            <div class="cardContent" >
                <div class="cardTitle" >
                    Crear carpeta
                </div>
                <div >
                    <input v-model="folderName" type="text" placeholder="Nombre de la carpeta">
                </div>
                <div style="float:left;margin-left:80px">
                    <h3>{{advise}}</h3>
                    <button class="btn" @click="showCreateFolderFN">Cancelar </button>
                    <button class="btn" @click="createFolder">Crear carpeta </button>
                </div>
            </div>
        </div>

        <!-- UPLOAD AND CREATE FOLDER BUTONS   -->

            <div class="upload" >
                <label  for="file" style="cursor:pointer">
                    upload file  <span class="glyphicon glyphicon-upload"></span>
                </label>
                <input class="inputfile" id="file" type="file" @change="processFile($event)">
            </div>
            <button class="btn"  @click="showCreateFolderFN">create folder </button>

    </div>
</template>

<script>
    import axios from 'axios';
    import download from 'downloadjs'
    import * as firebase from "firebase/app";
    import "firebase/messaging";
    const firebaseConfig = {
        apiKey: "AIzaSyDE7JTD40N6qE3eK8MNoyr0RLOeigZ1iNs",
        authDomain: "arquitecturasoftware-2a62f.firebaseapp.com",
        databaseURL: "https://arquitecturasoftware-2a62f.firebaseio.com",
        projectId: "arquitecturasoftware-2a62f",
        storageBucket: "arquitecturasoftware-2a62f.appspot.com",
        messagingSenderId: "677121396392",
        appId: "1:677121396392:web:aacf0dadc7a40b1b",
        vapidKey: 'BFbSOjbEqXyX-ek63Qkox-5NvnDUZd7bWQy9zWx9YbntHLJ-B_4iEtxQxF0PBMiJGOhsXmm2qYkxOhb1Uupxpkw'
    }
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(firebaseConfig.vapidKey);
    messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        messaging.getToken().then(function(currentToken) {
            if (currentToken) {
                console.log("el token es ");
                console.log(currentToken);
                messaging.onMessage(function(payload) {
                    alert(payload.notification.body)
                    console.log('Message received. ', payload);
                // ...
                });
            } else {
                console.log('No Instance ID token available');
            }
        }).catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
        });
    }).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
    });
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
        mounted(){
            if (localStorage.session) {
                if (localStorage.session != "true") {
                    this.is_signed = localStorage.session;
                    this.$router.push({name: 'login'})
                }else{
                    this.name = localStorage.name
                    this.email = localStorage.email
                    this.token = localStorage.token
                    console.log("in session");
                    this.updateList()
                }
            }
        },
        methods: {

            addDot: function (name) {
                return name.replace("_dot_",".")
            },
            checkDot: function(name){
                return(name.includes("_dot_"))
            },
            moveTo: function (fileList) {
                this.current_path.push(fileList)
            },
            popCurrentPath: function() {
                this.current_path.pop()
            },
            getExtension: function(filename){
                let ret = filename.split('_dot_').pop();
                return ret
            },
            getOptions: function(fName,path){
                this.showOptions = true
                this.folderOptionName = fName
                this.fileOrigin = path;
                console.log("displayed");
                console.log(this.fileOrigin);
            },
            hideOption: function () {
                this.showOptions = false
                this.folderOptionName = ""
                this.fileOrigin = ""
                this.fileDestiny = ""
            },
            adviseError: function(msg){
                this.advise = msg
                setTimeout(() => this.advise="", 3000);
            },
            ShowMoveFile: function () {
                let arr = this.current_path[this.current_path.length-1]
                this.possiblePaths = []
                for (let i = 0; i < arr.length; i++) {
                    if(!this.checkDot(arr[i].name)){
                        this.possiblePaths.push(arr[i].name)
                    }
                }
                console.log(this.possiblePaths);
                this.MoveToShow = !this.MoveToShow
            },
            updateList(){
                this.current_path = []
                this.user_files = []
                this.getList()
                this.current_path.push(this.user_files)
            },
            forceUpdate(){
                this.$forceUpdate();
            }
            ,
            async getDownload (filePath) {
                const res = await axios.post(this.hostname, {
                query:`
                mutation{
                    downloadFile(file:{
                        path: "`+filePath+`"
                    },input:{
                        email: "`+localStorage.email+`"
                        token: "`+localStorage.token+`"
                        mobil: "false"
                    }){
                        base64
                        name
                    }
                }`
        })
                let tmpBase64 = res.data.data.downloadFile.base64
                let filedone = atob(tmpBase64)
                let name = res.data.data.downloadFile.name
                let a = name.split('_dot_').pop();
                let name1=""
                if (a == "png"){
                    name1 = "image/png"
                }else if(a == "jpg"){
                    name1 = "image/jpg"
                } else{
                    name1 = "text/"+a
                }
                download(filedone,name, name1)
                
                console.log(res.data.data.downloadFile);
                console.log(filePath);
            }
            ,
            async deleteFile  () {
                /**

                if(true){
                    if(this.checkDot(this.folderOptionName)){
                        console.log("es archivo");

                    }else{
                        console.log("Es carpeta");
                        this.fileOrigin = "/SharedStorage/sergio/"+this.folderOptionName
                    }
                    console.log(this.fileOrigin);

                }
       */

                    const res = await axios.post(this.hostname, {
                        query:`mutation{
                            deleteFile(del:{
                                owner: "prueba"
                                    path: "`+this.fileOrigin+`"
                                },input:{
                                    email: "`+localStorage.email+`"
                                    token: "`+localStorage.token+`"
                                    mobil: "false"
                                }){
                                    del_id
                                    owner
                                    path
                                    date
                                    advise
                                }
                                }`
                })
                console.log(res.data.data);
                this.updateList()


            },
            async showCreateFolderFN  () {
                this.showCreateFolder = !this.showCreateFolder;
            },
            async Download  () {
                this.showCreateFolder = !this.showCreateFolder;
            },
            async getList(){
                console.log("se ejecuta el list");
                const res = await axios.post(this.hostname, {
                        query:`mutation{
                                downloadList(owner:{
                                    owner:"`+localStorage.name.trim()+`"
                                },input:{
                                    email:"`+localStorage.email+`",
                                    token:"`+localStorage.token+`"
                                    mobil: "false"
                                }){
                                    name
                                    owner
                                    path
                                    ...filesRecursive
                                }
                                }
                                fragment filesRecursive on File {
                                files{
                                    ...fileFields
                                    files{
                                        ...fileFields
                                    files{
                                        ...fileFields
                                        files{
                                            ...fileFields
                                            files{
                                                ...fileFields
                                            }
                                        }
                                    }
                                    }
                                }
                                }

                                fragment fileFields on File {
                                    name
                                    owner
                                    path
                                }`
                })
                //console.log("downloadList");
                //console.log(res.data.data.downloadList);

                if(res.data.data.downloadList != null){
                    let tmp = res.data.data.downloadList.files;
                    for (let index = 0; index < tmp.length; index++) {
                        this.user_files.push(tmp[index])
                    }
                }



            }
            ,
            async createFolder  () {
                if(this.folderName != ""){

                    const res = await axios.post(this.hostname, {
                        query:`mutation{
                            createFolder(create:{
                                owner: "`+localStorage.name.trim()+`"
                            path: "/SharedStorage/`+localStorage.name.trim()+`/`+this.folderName+`"
                        },input:{
                            email: "`+localStorage.email+`"
                            token: "`+localStorage.token+`"
                            mobil: "false"
                        }){
                            create_id
                            owner
                            path
                            date
                            advise
                        }
                    }`
                })
                console.log(res.data.data.createFolder);
                this.updateList()

                }else{
                    this.adviseError("El nombre no puede estar vacio")
                }
            },
            async processFile(event) {
                let data= new FormData()
                let file =  event.target.files[0]
                //console.log(file.name);
                let operations ='{ "query": "mutation($uploads: [Upload!]!){  uploadFiles(files:{    uploads:$uploads    name: \\"'+file.name+'\\"    description:\\"prueba gql\\"    owner: \\"'+localStorage.name.trim()+'\\"  },input:{email:\\"'+localStorage.email+'\\" token: \\"'+localStorage.token+'\\" mobil: \\"false\\"})  {    name description owner path advise  }}", "variables": { "uploads": [null] } }'
                data.append("operations",operations)
                data.append('map','{ "0": ["variables.uploads.0"] }')
                data.append('0',file)

                const res = await axios.post(this.hostname,data,{
                    headers: { 'Content-Type': 'multipart/form-data'  }
                } )

                console.log(file);
                this.upload = res.data.data
                this.updateList()
            },
            async moveFile () {

                    if(this.fileDestiny == "Extraer de la carpeta"){
                        console.log(this.fileOrigin);
                        this.fileOrigin = this.fileOrigin.replace("/SharedStorage","")
                        this.fileOrigin = this.fileOrigin.replace("/"+localStorage.name.trim(),"")
                        console.log(this.fileOrigin);

                        let tmp = this.fileOrigin.split("/")
                        //console.log(tmp);
                        this.fileDestiny = this.fileOrigin.replace("/"+tmp[tmp.length - 2],"")
                        console.log(this.fileDestiny);

                        //return;
                    }else{
                        if( this.fileOrigin == null){
                             this.fileOrigin = "/"+this.addDot(this.folderOptionName)
                        }
                        this.fileDestiny = this.fileOrigin.replace(this.addDot(this.folderOptionName),"") + this.fileDestiny
                        this.fileDestiny = this.fileDestiny.replace("/"+localStorage.name.trim(),"")
                        this.fileDestiny = this.fileDestiny.replace("/SharedStorage","")
                        this.fileOrigin = this.fileOrigin.replace("/"+localStorage.name.trim(),"")
                        this.fileOrigin = this.fileOrigin.replace("/SharedStorage","")
                        this.fileDestiny += "/"+this.addDot(this.folderOptionName)
                        console.log(this.fileOrigin);
                        console.log(this.fileDestiny);

                    }

                    const res = await axios.post(this.hostname, {
                        query:`mutation{
                                    moveFile(move:{
                                        owner:"`+localStorage.name.trim()+`"
                                        #origen, incluyendo el archivo (graphql en este caso)
                                        origin:"/SharedStorage/`+localStorage.name.trim()+`/`+this.fileOrigin+`"
                                        #destino, incluyendo el archivo (graphql en este caso)
                                        destiny:"/SharedStorage/`+localStorage.name.trim()+`/`+this.fileDestiny+`"

                                    },input:{
                                        email: "`+localStorage.email+`"
                                        token: "`+localStorage.token+`"
                                        mobil: "false"
                                    })
                                    {
                                        move_id
                                        owner
                                        origin
                                        destiny
                                        date
                                        advise
                                    }
                                }`
                })
                this.moveReturn = res.data.data.moveFile
                this.updateList()
                console.log(res.data.data);

            }

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