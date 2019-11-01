export const HOST = "172.30.56.74";
export const PORT = "8081";
export const BASEURL = `http://localhost:8081`;

import axios from "axios";
export function sendMail(campaignId,selectedCustomer){
    return axios.post(`${BASEURL}/email/sendMail`, {
        customers: selectedCustomer,
        campaignId: campaignId,
        sendEmailUserId: 1
      });
}