export const HOST = "172.30.56.74";
export const PORT = "8081";
// export const BASEURL = `http://localhost:8081`;
// export const BASEURL = `http://192.168.56.211:8081`;
export const BASEURL = `http://192.168.33.154:8081`;

import axios from "axios";

// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";
export function sendMail(campaignId, selectedCustomer) {
  return axios.post(`${BASEURL}/email/sendMail`, {
    customers: selectedCustomer,
    campaignId: campaignId,
    sendEmailUserId: 2
  });
}
export function sendMailAll(campaignIds, selectedCustomer) {
  let payload = campaignIds.map(item => {
    return {
      customers: selectedCustomer,
      campaignId: item,
      sendEmailUserId: 2
    };
  });
  return axios.post(`${BASEURL}/email/send-campaign`, payload);
}

export function getCampaigns(page, size) {
  return axios.get(
    `${BASEURL}/email/get-all-campaign-detail?page=${page}&size=${size}`
  );
}
export function editCampaignTemplate(id, emailTempaleId) {
  return axios.post(`${BASEURL}/email/edit-email-template-campaign`, {
    id,
    emailTempaleId
  });
}
export function deleteCampaign(id) {
  return axios.post(`${BASEURL}/email/edit-campaign`, {
    id,
    isActivated: 0
  });
}
