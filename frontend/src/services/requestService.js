import api from './api';

const requestService = {
  async getAllRequests() {
    const response = await api.get('/requests');
    return response.data;
  },

  async getRequestById(id) {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  async createRequest(requestData) {
    const response = await api.post('/requests', requestData);
    return response.data;
  },

  async approveRequest(id) {
    const response = await api.put(`/requests/${id}/approve`);
    return response.data;
  },

  async rejectRequest(id) {
    const response = await api.put(`/requests/${id}/reject`);
    return response.data;
  },

  async returnRequest(id) {
    const response = await api.put(`/requests/${id}/return`);
    return response.data;
  },

  async getOverdueRequests() {
    const response = await api.get('/requests/overdue');
    return response.data;
  }
};

export default requestService;

