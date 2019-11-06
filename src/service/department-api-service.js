//this service file contains functions for client to interact with Department API endpoints
import axios from 'axios'
import * as API from "./API"


const DepartmentApiService = {
    getAllDepartments() {
        return axios
            .get(`${API.BASEURL}/rest/getAllListDepartment`)
            .then(response => response.data)
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
                    alert(
                        `Removed department ${dept.name} successfully!`
                    );

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
            .post(`http://172.30.56.57:8081/rest/departmentInfoUpdate`, editedDept)
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