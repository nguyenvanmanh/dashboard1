//this service file contains functions for client to interact with Department API endpoints
import axios from "axios";
import * as API from "./API";

const DepartmentApiService = {
  getAllDepartments(pageNo, pageSize) {
    return axios
      .get(
        `${API.BASEURL}/rest/list-all-department-with/page-no=${pageNo}&page-size=${pageSize}`
      )
      .then(response => response.data);
  },
  deactivateDepartment(dept) {
    return axios
      .post(`${API.BASEURL}/rest/update-department-inactive`, dept)
      .then(response => {
        if (response.status === 200) {
          //   alert(`Removed department ${dept.name} successfully!`);
          console.log(response.data);
          return response.data;
        }
      });
  },
  reactivateDepartment(dept) {
    return axios
      .post(`${API.BASEURL}/rest/update-department-active`, dept)
      .then(response => {
        if (response.status === 200) {
          //   alert(`Reactivate department ${dept.name} successfully!`);
          console.log(response.data);
          return response.data;
        }
      });
  },
  insertDepartment(dept) {
    return axios
      .post(`${API.BASEURL}/rest/add-new-department`, dept)
      .then(response => {
        if (response.status === 201) {
          //   alert("New Department successfully added!");
          let key = "Success!!!";
          return response.data[key];
        }
      });
  },
  updateDepartment(editedDept) {
    return axios
      .post(`${API.BASEURL}/rest/update-department-information`, editedDept)
      .then(response => {
        if (response.status === 201) {
          //   alert(`Department ${editedDept.name} successfully modified!`);
          let key = "Success!!!";
          return response.data[key];
        }
      });
  },
  getListEmployeeNotInDepartment(id, pageNo, pageSize) {
    return axios
      .get(
        `${API.BASEURL}/rest/list-employee-not-in-department-with/department-id=${id}&page-no=${pageNo}&page-size=${pageSize}`
      )
      .then(response => response.data);
  },
  getListEmployeeOfDepartment(id, pageNo, pageSize) {
    return axios
      .get(
        `${API.BASEURL}/rest/list-employee-of-department-with/department-id=${id}&page-no=${pageNo}&page-size=${pageSize}`
      )
      .then(response => response.data);
  },
  //Active & Inactive Department Button
  getListDepartmentActive(pageNo, pageSize) {
    return axios
      .get(
        `${API.BASEURL}/rest/list-actived-department-with/page-no=${pageNo}&page-size=${pageSize}`
      )
      .then(response => response.data);
  },
  getListDepartmentInActive(pageNo, pageSize) {
    return axios
      .get(
        `${API.BASEURL}/rest/list-inactived-department-with/page-no=${pageNo}&page-size=${pageSize}`
      )
      .then(response => response.data);
  }
};

export default DepartmentApiService;
