import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeesView from '../views/Employees/View.vue'
import EmployeeCreate from '../views/Employees/Create.vue'
import EmployeeEdit from '../views/Employees/Edit.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/Potlucks',
      name: 'Potlucks',
      component: EmployeesView
    }
    ,
    {
      path: '/employee/create',
      name: 'employeeCreate',
      component: EmployeeCreate
    },
    {
      path: '/employee/:id/edit',
      name: 'employeeEdit',
      component: EmployeeEdit
    }
  
  ]
})

export default router
