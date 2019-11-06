//this service file contains functions for client to interact with Department API endpoints
import axios from 'axios'
import * as API from "./API"


const DepartmentApiService = {
    getAllDepartments() {
        return axios
            .get(`${API.BASEURL}/rest/getAllListDepartment`)
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

}

export default DepartmentApiService;