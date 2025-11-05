import api from './api';

const equipmentService = {
  async getAllEquipment(category = null, available = null) {
    const params = {};
    if (category) params.category = category;
    if (available !== null) params.available = available;
    
    const response = await api.get('/equipment', { params });
    return response.data;
  },

  async getEquipmentById(id) {
    const response = await api.get(`/equipment/${id}`);
    return response.data;
  },

  async searchEquipment(keyword) {
    const response = await api.get('/equipment/search', {
      params: { keyword }
    });
    return response.data;
  },

  async createEquipment(equipmentData) {
    const response = await api.post('/equipment', equipmentData);
    return response.data;
  },

  async updateEquipment(id, equipmentData) {
    const response = await api.put(`/equipment/${id}`, equipmentData);
    return response.data;
  },

  async deleteEquipment(id) {
    const response = await api.delete(`/equipment/${id}`);
    return response.data;
  }
};

export default equipmentService;

