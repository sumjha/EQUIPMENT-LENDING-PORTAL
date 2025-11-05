package com.school.equipmentlending.service;

import com.school.equipmentlending.dto.BorrowRequestDto;
import com.school.equipmentlending.exception.BadRequestException;
import com.school.equipmentlending.exception.ResourceNotFoundException;
import com.school.equipmentlending.model.BorrowRequest;
import com.school.equipmentlending.model.Equipment;
import com.school.equipmentlending.model.RequestStatus;
import com.school.equipmentlending.repository.BorrowRequestRepository;
import com.school.equipmentlending.repository.EquipmentRepository;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for BorrowRequest operations
 */
@Slf4j
public class BorrowRequestService {

    private final BorrowRequestRepository borrowRequestRepository = new BorrowRequestRepository();
    private final EquipmentRepository equipmentRepository = new EquipmentRepository();

    public List<BorrowRequest> getAllRequests() {
        return borrowRequestRepository.findAll();
    }

    public BorrowRequest getRequestById(Long id) {
        return borrowRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BorrowRequest", "id", id));
    }

    public BorrowRequest createRequest(BorrowRequestDto requestDto) {
        Equipment equipment = equipmentRepository.findById(requestDto.getEquipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", requestDto.getEquipmentId()));

        if (equipment.getAvailableQty() < requestDto.getQuantity()) {
            throw new BadRequestException("Insufficient equipment available");
        }

        BorrowRequest borrowRequest = new BorrowRequest();
        borrowRequest.setUserId(requestDto.getUserId());
        borrowRequest.setEquipmentId(requestDto.getEquipmentId());
        borrowRequest.setQuantity(requestDto.getQuantity());
        borrowRequest.setBorrowDate(requestDto.getBorrowDate());
        borrowRequest.setReturnDate(requestDto.getReturnDate());
        borrowRequest.setPurpose(requestDto.getPurpose());
        borrowRequest.setStatus(RequestStatus.PENDING);

        log.info("Creating borrow request for equipment ID: {}", requestDto.getEquipmentId());
        return borrowRequestRepository.save(borrowRequest);
    }

    public BorrowRequest approveRequest(Long id) {
        BorrowRequest request = getRequestById(id);

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be approved");
        }

        Equipment equipment = equipmentRepository.findById(request.getEquipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", request.getEquipmentId()));

        if (equipment.getAvailableQty() < request.getQuantity()) {
            throw new BadRequestException("Insufficient equipment available");
        }

        // Update equipment availability
        equipment.setAvailableQty(equipment.getAvailableQty() - request.getQuantity());
        equipmentRepository.save(equipment);

        // Update request status
        request.setStatus(RequestStatus.APPROVED);
        request.setApprovedAt(LocalDateTime.now());
        
        log.info("Approved borrow request ID: {}", id);
        return borrowRequestRepository.save(request);
    }

    public BorrowRequest rejectRequest(Long id) {
        BorrowRequest request = getRequestById(id);

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be rejected");
        }

        request.setStatus(RequestStatus.REJECTED);
        
        log.info("Rejected borrow request ID: {}", id);
        return borrowRequestRepository.save(request);
    }

    public BorrowRequest returnRequest(Long id) {
        BorrowRequest request = getRequestById(id);

        if (request.getStatus() != RequestStatus.APPROVED) {
            throw new BadRequestException("Only approved requests can be returned");
        }

        Equipment equipment = equipmentRepository.findById(request.getEquipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", request.getEquipmentId()));

        // Return equipment to available pool
        equipment.setAvailableQty(equipment.getAvailableQty() + request.getQuantity());
        equipmentRepository.save(equipment);

        // Update request status
        request.setStatus(RequestStatus.RETURNED);
        request.setReturnedAt(LocalDateTime.now());
        
        log.info("Returned equipment for borrow request ID: {}", id);
        return borrowRequestRepository.save(request);
    }
}
