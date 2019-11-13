//this service file contains functions for client to interact with Department API endpoints
import axios from 'axios'
import * as API from "./API"


const DepartmentApiService = {
    getAllDepartments(pageNo, pageSize) {
        console.log(pageNo, pageSize)
        return axios
            .get(`${API.BASEURL}/rest/list-all-department-with/page-no=${pageNo}&page-size=${pageSize}`)
            .then(response => {
                Object.keys(response.data).map(function(key) {
                    response.data[key];
                    console.log(response.data[key])
                  });
                 console.log(Object.keys(response.data))
             
               }
                )
    },
    getActiveDepartments() {
        return axios
            .get(`${API.BASEURL}/rest/getListDepartmentActive`)

            .then(response => response.data)
            

    },
    getInactiveDepartments(){
        return axios
        .get(`${API.BASEURL}/rest/getListDepartmentInActive`)

        .then(response => response.data)
        
    },
    deactivateDepartment(dept) {
        return axios
            .post(`${API.BASEURL}/rest/inActiveDepartment`, dept)
            .then(response => {
                if (response.status === 201) {
                    // alert(
                    //     `Removed department ${dept.name} successfully!`
                    // );
                   

                }
            })
    },
    reactivateDepartment(dept) {
        return axios
            .post(`${API.BASEURL}/rest/activeDepartment`, dept)
            .then(response => {
                if (response.status === 201) {
                    alert(`Reactivate department ${dept.name} successfully!`);
                    // window.location.reload();
                }
            })

    },
    insertDepartment(dept){
        return axios
          .post(`${API.BASEURL}/rest/insertDepartment`, dept)
          .then(response => {
            if (response.status === 201) {
              alert("New Department successfully added!");
            }
          })
    },
    updateDepartment(editedDept) {
        return axios
            .post(`${API.BASEURL}/rest/updateDepartmentInfomation`, editedDept)
            .then(response => {
                if (response.status === 201) {
                    alert(
                        `Department ${editedDept.name} successfully modified!`
                    );
                    
                }
            })
    }

}

export default DepartmentApiService;