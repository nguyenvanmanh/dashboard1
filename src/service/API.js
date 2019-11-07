export const HOST = "172.30.56.74";
export const PORT = "8081";
export const BASEURL = `http://localhost:8081`;
// export const BASEURL = `http://192.168.33.154:8081`;

import axios from "axios";
export function sendMail(campaignId, selectedCustomer) {
  return axios.post(`${BASEURL}/email/sendMail`, {
    customers: selectedCustomer,
    campaignId: campaignId,
    sendEmailUserId: 1
  });
}
export function sendMailAll(campaignIds, selectedCustomer) {
  let payload = campaignIds.map(item => {
    return {
      customers: selectedCustomer,
      campaignId: item,
      sendEmailUserId: 1
    };
  });
  return axios.post(`${BASEURL}/email/send-campaign`, payload);
}

export function getCampaigns(page = 0, size = 10) {
  return axios.get(
    `${BASEURL}/email/get-all-campaign-detail?page=${page}&size=${size}`
  );
}
