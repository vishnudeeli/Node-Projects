<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Employee</h4>
            </div>
            <div class="card-body">
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
                    <button type="button" @click="updateStudent" class="btn btn-primary">Update</button>
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
  name:'employeeEdit',
  
  data(){
    return {
        Id:"",
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
  mounted() {
    this.getStudentData(this.$route.params.id);
    this.Id=this.$route.params.id;
  },
  methods:{
    getStudentData(Id){
axios.get(`http://localhost:5154/api/Potlucks/${Id}`).then(res=>{
    console.log(res);
    this.model.employee=res.data
    // this.model.student.name=res.data.name,
    // this.model.student.email=res.data.email,
    // this.model.student.phone=res.data.phone
});
    },
    updateStudent(){
      axios.put(`http://localhost:5154/api/Potlucks/`+ this.$route.params.id,this.model.employee).then(res=>{
        console.log(res)
        this.$router.push('/Potlucks')

    }
      );
    }
  },
}
</script>