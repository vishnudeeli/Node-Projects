<!-- <template>
<div class="container">
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4>Employees</h4>
            <button class="btn btn-primary ml-auto">
                <RouterLink to="/employee/create" class="text-white">Add Employee</RouterLink>
            </button>
        </div>
        <div class="card-body">

            <table class="table" table-bordered>
                <thead>
                  <tr>
                    <th>EmployeeID</th>
                    <th>EmployeeName</th>
                    <th>DishName</th>
                    <th>Dish</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody v-if="this.potlucks.length>0">
                    <tr v-for="(employee,index) in this.potlucks" :key="index" >
                      <td>{{ employee.empId }}</td>
                      <td>{{ employee.empName }}</td>
                      <td>{{ employee.dishName }}</td>
                      <td><img :src="employee.dishUrl" :alt="employee.dishName" style="width: 100px; height: 100px;" /></td>
                      <td>{{ employee.description }}</td>
<td>
  
<button class="btn btn-success ml-auto">
                <RouterLink  :to="{path: 'employee/'+employee.id+ '/edit'}" class="text-white">Edit</RouterLink>
            </button>
            <button class="btn btn-danger ml-auto" @click="deleteStudent(employee.id)">
                <RouterLink  :to="{path: '/Potlucks'}" class="text-white">Delete</RouterLink>
            </button>
</td>
                    </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="5">Loading....</td>
                  </tr>
                  </tbody>

            </table>
        </div>
    </div>

</div>
</template> -->

<template>
  <div> 
    <center><h1 class="title">Potluck Participants</h1> </center>
    <button class="create-button">
                <RouterLink  to="/employee/create" class="text-white">Add Participants</RouterLink>
            </button>
     
</div>
  <div class="employee-container">
    <div class="employee-grid">
      <div v-for="employee in potlucks" :key="employee.id" class="employee-card">
        <h3>{{ employee.dishName }}</h3>

        <div class="employee-image-container">
          
          <img :src="employee.dishUrl" class="employee-image" />
        </div>
        <div class="employee-details">

          <h6>EmployeeID : {{ employee.empId }}</h6>
          <h6>EmployeeName :{{ employee.empName }}</h6>
          <p>About : {{ employee.description }}</p>
        </div>
        <div class="employee-actions">

        <button class="btn btn-success ml-auto">
                <RouterLink  :to="{path: 'employee/'+employee.id+ '/edit'}" class="text-white">Edit</RouterLink>
            </button>
            <button class="btn btn-danger ml-auto" @click="deleteStudent(employee.id)">
                <RouterLink  :to="{path: '/Potlucks'}" class="text-white">Delete</RouterLink>
            </button>
            </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'Potlucks',
  data(){
    return {
      potlucks:[]
    }
  },
  mounted(){
   this.getStudents();
  },
  methods:{
    deleteStudent(Id){
if(confirm("Are you want to delete the data?")){
  axios.delete(`http://localhost:5154/api/Potlucks/${Id}`).then(res=>{
    console.log(res)
    //alert("Deleted Successfully");
    this.getStudents();
  });
}
    },
    getStudents(){
      axios.get('http://localhost:5154/api/Potlucks/').then(res=>{
        console.log(res)

this.potlucks=res.data
console.log(this.potlucks)
      });
    }
  },
}
</script>

<style>
  .employee-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  .employee-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }

  .employee-image-container {
    width:  300px;
    height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .employee-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .employee-details {
    text-align: center;
    margin-top: 20px;
  }

  .employee-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .create-button {
    display: block;
    float:right;
    margin-top: 15px;
    text-align: center;
    background-color: #604caf;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }

  .create-button:hover {
    background-color: #3e8e41;
  }
  
</style>