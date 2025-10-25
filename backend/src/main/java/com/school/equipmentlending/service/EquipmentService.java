package com.school.equipmentlending.service;

import com.school.equipmentlending.dto.EquipmentRequest;
import com.school.equipmentlending.dto.MessageResponse;
import com.school.equipmentlending.exception.ResourceNotFoundException;
import com.school.equipmentlending.model.Equipment;
import com.school.equipmentlending.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", id));
    }

    public List<Equipment> searchEquipment(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return equipmentRepository.findAll();
        }
        return equipmentRepository.searchByKeyword(keyword);
    }

    public List<Equipment> filterEquipment(String category, Boolean available) {
        return equipmentRepository.findByFilters(category, available);
    }

    @Transactional
    public Equipment createEquipment(EquipmentRequest request) {
        Equipment equipment = new Equipment();
        equipment.setName(request.getName());
        equipment.setCategory(request.getCategory());
        equipment.setDescription(request.getDescription());
        equipment.setQuantity(request.getQuantity());
        equipment.setAvailableQty(request.getQuantity()); // Initially all available
        equipment.setCondition(request.getCondition());
        equipment.setImageUrl(request.getImageUrl());

        return equipmentRepository.save(equipment);
    }

    @Transactional
    public Equipment updateEquipment(Long id, EquipmentRequest request) {
        Equipment equipment = getEquipmentById(id);

        equipment.setName(request.getName());
        equipment.setCategory(request.getCategory());
        equipment.setDescription(request.getDescription());
        equipment.setCondition(request.getCondition());
        equipment.setImageUrl(request.getImageUrl());

        // Update quantity and adjust available quantity proportionally
        if (!equipment.getQuantity().equals(request.getQuantity())) {
            int borrowed = equipment.getQuantity() - equipment.getAvailableQty();
            equipment.setQuantity(request.getQuantity());
            equipment.setAvailableQty(Math.max(0, request.getQuantity() - borrowed));
        }

        return equipmentRepository.save(equipment);
    }

    @Transactional
    public MessageResponse deleteEquipment(Long id) {
        Equipment equipment = getEquipmentById(id);
        equipmentRepository.delete(equipment);
        return new MessageResponse("Equipment deleted successfully");
    }
}

