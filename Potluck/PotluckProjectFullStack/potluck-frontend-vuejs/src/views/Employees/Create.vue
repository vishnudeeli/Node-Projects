<template>
  <div class="container mt-5">
      <div class="card">
          <div class="card-header">
              <h4>Add Employees</h4>
          </div>
          <div class="card-body">
              <ul class="alert alert-warning" v-if="Object.keys(this.errList).length>0">
                  <li class="mb-0 ms-3" v-for="(error,index) in this.errList" :key="index">{{ error[0] }}</li>

              </ul>
              <div class="mb-3">
                  <label for="">EmployeeId</label>
                  <input type="text" v-model="model.employee.empId" class="form-control">
              </div>
              <div class="mb-3">
                  <label for="">EmployeeName</label>
                  <input type="text" v-model="model.employee.empName" class="form-control">
              </div>
              
              <div class="mb-3">
                  <label for="">DishName</label>
                  <input type="text" v-model="model.employee.dishName" class="form-control"/>

              </div>
              <div class="mb-3">
                  <label for="">DishUrl</label>
                  <input type="text" v-model="model.employee.dishUrl" class="form-control"/>

              </div>
              <div class="mb-3">
                  <label for="">Description</label>
                  <input type="text" v-model="model.employee.description" class="form-control"/>

              </div>
              <div class="mb-3">
                  <button type="button" @click="saveEmployee" class="btn btn-primary">Save</button>
                  <button class="btn btn-success ml-auto">
              <RouterLink  :to="{path: '/Potlucks'}" class="text-white">Back</RouterLink>
              
          </button>

              </div>
              
          </div>
      </div>
  </div>
</template>



<script>
import axios from 'axios';


export default {
name:'employeeCreate',

data(){
  return {
      errList:'',
model :{
employee:{
  empName:"",
  empId:"",
  dishName:"",
  dishUrl:"",
  description:""
  }
}
  }
},

methods:{
  

  saveEmployee(){
      var mythis=this;
    axios.post('http://localhost:5154/api/Potlucks/',this.model.employee).then(res=>{
      console.log(res)
      
      
this.model.employee={
empName:"",
  empId:"",
  dishName:"",
  dishUrl:"",
  description:""
      }

      this.$router.push('/Potlucks')


    }).catch(function(error){

      
      if (error.response) {
          if(error.response.status==422){
              mythis.errList=error.response.data.errors
      }
  //   console.log(error.response.data);
  //   console.log(error.response.status);
  //   console.log(error.response.headers);
  } else if (error.request) {
    
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
    })
  }
},
}
</script>
