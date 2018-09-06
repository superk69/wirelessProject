<template>
<v-flex>


    <v-container fill-height fluid grid-list-md class="lighten-4 innerstyle">   
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12><h3 class="grayz--text">กราฟแสดงข้อมูลย้อนหลังของเซ็นเซอร์แต่ละตัว</h3></v-flex>         
          <v-flex lg6 md6 xs12 sm12  v-for="c in cards" v-bind:key="c.name">
                  <span>{{c.name}}</span>
                  <v-card v-bind:id="c.id"></v-card>
          </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <v-container fill-height fluid grid-list-md class="lighten-4 innerstyle">  
      <v-layout row wrap>
          <v-flex xs12 sm12 md12 lg12><h3 class="grayz--text">เรียกข้อมูลย้อนหลังของเซ็นเซอร์แต่ละตัว</h3></v-flex> 
          <v-flex xs12 md8>
            <v-select v-if="selectAble" :items="id_list" v-model="e1" label="เลือกอุปกรณ์ที่ต้องการดูประวัติ" single-line> </v-select>
          </v-flex>

          <v-flex xs12 md2>
            <v-btn block color="deep-orange darken-4" dark @click="callHistory()">เรียกข้อมูล</v-btn>
          </v-flex>

          <v-flex xs12 md2>
            <download-excel color="deep-orange darken-4" class   = "btn btn-deep-orange darken-4 block" :data   = "history" :fields = "json_fields" name    = "filename.xls"> &nbsp;&nbsp;&nbsp;ดาวน์โหลดเป็นไฟล์ excel&nbsp;&nbsp;&nbsp; </download-excel>
          </v-flex>    
      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <v-container fill-height fluid grid-list-md class="lighten-4 innerstyle">  
      <v-layout row warp>
        <v-data-table :headers="headers" :items="history" class="elevation-1" >
            <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td xs12>{{ props.item.date_added }}</td>
                <td class="text-xs-right" xs12>{{ props.item.value }}</td>
              </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
                </v-alert>
        </v-data-table>
        
      </v-layout>
      </v-container>
      <br><br><br><br>

    
    </v-flex>
</template>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script>
import {firebaseApp} from '../FirebaseApp'
  import axios from 'axios';
  import uniqid from 'uniqid';
  import len from 'object-length';
  import moment from 'moment';
  import _ from 'lodash';
  var socket;

export default {
  name : "Charts",
  data () {
      return {
        selectAble : false,
        cards : [],
        io : null,
         picker: null,
        picker2: null,
        e1:null,
        id_list : [],
        history : [],
        search : '',
        
        headers: [
        {
          text: 'วันที่เก็บข้อมูล',value: 'name'
        },
        { text: 'ค่าที่บันทึก', value: 'calories' },
      ],
        json_fields: {
          'device_id' : 'device_id',
            'date_added': 'date_added',
            'Value': 'value'
        }, 
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ]

      }
      
  },
  mounted () {
     let authListenerUnsuscribe = firebaseApp.auth().onAuthStateChanged(user => { 
        if (user) {
          var data =[user.email,user.displayName,user.photoURL,user.providerData[0].providerId,user.uid];
          console.log("user",data)
          this.$store.commit('updateUser',data);    
          if(this.$store.state.home_id==''){
                this.$router.replace("/");
            } 
            this.$store.commit('updatesubTitle',this.store.state.home_id+" ข้อมูลสรุปผล");
    this.$store.commit('updatesubText','');
          }else{
          this.$router.replace("/");
          this.login_dialog = true; 
          }
        });
       
          this.windowSize = { x: window.innerWidth, y: window.innerHeight }
                var tmpurl2 = "http://"+this.$store.state.host+"/console/"+this.$store.state.home_id;
                              axios({ method: "GET", "url": tmpurl2,"headers": { "content-type": "application/json", "Authorization" : this.$store.state.token }}).then(result => {
                                    console.log("card",result);
                                    
                                    for(var i=0;i< len(result.data);i++){
                                      this.id_list[i] = result.data[i].device_id
                                      this.cards.push({ 
                                        id:result.data[i].device_id, 
                                        unitname : result.data[i].device_unitname,
                                        date_added :result.data[i].date_added ,
                                        title: result.data[i].device_name,
                                        type:result.data[i].device_type,
                                        device_token :result.data[i].device_token
                                        });
                                    }
                                    this.selectAble = true
                              }, error => {
                                      console.error(error);
                              });
          this.add(this.$store.state.home_id)
          var vm =this
      socket.on('graph', function (data) {
          
          var ioo =[]
          data.forEach(element => {
            var arr=[]
            element.forEach(el=>{
              arr.push({'value' : el.value,date_added: el.date_added})
            })
            var key = element[0].device_id
            ioo[key]= arr
           
           
            
          });
          vm.io = ioo
          
           google.charts.load('current', {packages: ['corechart', 'line']});
           google.charts.setOnLoadCallback(vm.drawLogScales);
          
      });
   
  },
  computed : {

  },
  methods : {
    drawLogScales() {
      console.log("draw",this.io);
      
      var options = {
        height: 200,
        hAxis: {
          title: 'เวลา',
          logScale: true
        },
        vAxis: {
          title: 'ค่าต่ำสุด-สูงสุด',
          logScale: false
        },
        colors: ['#a52714', '#097138']
      };
      for(var i in this.io){
        
    console.log("data",this.io[i]);
    var innerdata = []
    innerdata.push(['เวลา',i]);
    for(var x = 0;x<this.io[i].length;x++){
      innerdata.push([(this.io[i][x].date_added.split(" ")[1]).split(":")[0]+" : "+(this.io[i][x].date_added.split(" ")[1]).split(":")[1],(this.io[i][x].value==false||this.io[i][x].value==true)? 0 : this.io[i][x].value])
    }
    console.log("innserdata",innerdata);
    
    var data = google.visualization.arrayToDataTable(innerdata);

        console.log(i);
        var idd = i.toString()
        document.getElementById(idd).innerHTML = '';
         var chart = new google.visualization.ColumnChart(document.getElementById(idd));
        chart.draw(data, options);
      }
    },
    add(id) {
                socket = io.connect('http://'+this.$store.state.host+'');
                console.log("emitting");
                
                socket.emit("ongraph", id);       
               
      },
      callHistory(){
           var id = this.e1
           this.history = [];
           axios({ method: "GET", "url": "http://"+this.$store.state.host+"/history/"+this.e1, "headers": { "content-type": "application/json", "Authorization" : this.$store.state.token } }).then(result => {
              console.log("result",result.data[0].device_id)
              this.history = result.data
                  }, error => {
                  console.error(error);
              });
      }

      
  },
  created () {
    
    this.$store.commit('updateComponent',3);
    document.head.querySelector('meta[name=theme-color]').content = this.$store.state.color_component 
    console.log("changed", this.$store.state.color_component)
  },
   beforeDestroy () {
      console.log("close socket");
      
      socket.disconnect();
    }
}
</script>
