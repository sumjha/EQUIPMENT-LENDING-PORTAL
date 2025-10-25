package com.school.equipmentlending.service;

import com.school.equipmentlending.dto.BorrowRequestDto;
import com.school.equipmentlending.dto.MessageResponse;
import com.school.equipmentlending.exception.BadRequestException;
import com.school.equipmentlending.exception.ResourceNotFoundException;
import com.school.equipmentlending.model.*;
import com.school.equipmentlending.repository.BorrowRequestRepository;
import com.school.equipmentlending.repository.EquipmentRepository;
import com.school.equipmentlending.repository.UserRepository;
import com.school.equipmentlending.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BorrowRequestService {

    @Autowired
    private BorrowRequestRepository borrowRequestRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BorrowRequest> getAllRequests() {
        UserDetailsImpl userDetails = getCurrentUser();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Admin and Staff can see all requests
        if (user.getRole() == UserRole.ADMIN || user.getRole() == UserRole.STAFF) {
            return borrowRequestRepository.findAllByOrderByRequestDateDesc();
        }

        // Students can only see their own requests
        return borrowRequestRepository.findByUserIdOrderByRequestDateDesc(user.getId());
    }

    public BorrowRequest getRequestById(Long id) {
        BorrowRequest request = borrowRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request", "id", id));

        // Check if user has permission to view this request
        UserDetailsImpl userDetails = getCurrentUser();
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (currentUser.getRole() == UserRole.STUDENT && !request.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("You don't have permission to view this request");
        }

        return request;
    }

    @Transactional
    public BorrowRequest createRequest(BorrowRequestDto requestDto) {
        UserDetailsImpl userDetails = getCurrentUser();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Equipment equipment = equipmentRepository.findById(requestDto.getEquipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", requestDto.getEquipmentId()));

        // Check if enough equipment is available
        if (equipment.getAvailableQty() < requestDto.getQuantity()) {
            throw new BadRequestException("Not enough equipment available. Available: " + equipment.getAvailableQty());
        }

        BorrowRequest borrowRequest = new BorrowRequest();
        borrowRequest.setUser(user);
        borrowRequest.setEquipment(equipment);
        borrowRequest.setQuantity(requestDto.getQuantity());
        borrowRequest.setDueDate(requestDto.getDueDate());
        borrowRequest.setNotes(requestDto.getNotes());
        borrowRequest.setStatus(RequestStatus.PENDING);

        return borrowRequestRepository.save(borrowRequest);
    }

    @Transactional
    public BorrowRequest approveRequest(Long id) {
        BorrowRequest request = getRequestById(id);

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be approved");
        }

        Equipment equipment = request.getEquipment();
        if (equipment.getAvailableQty() < request.getQuantity()) {
            throw new BadRequestException("Not enough equipment available");
        }

        // Update equipment availability
        equipment.setAvailableQty(equipment.getAvailableQty() - request.getQuantity());
        equipmentRepository.save(equipment);

        // Update request status
        UserDetailsImpl userDetails = getCurrentUser();
        User approver = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        request.setStatus(RequestStatus.APPROVED);
        request.setApprovedBy(approver);
        request.setApprovedDate(LocalDateTime.now());

        return borrowRequestRepository.save(request);
    }

    @Transactional
    public BorrowRequest rejectRequest(Long id) {
        BorrowRequest request = getRequestById(id);

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be rejected");
        }

        UserDetailsImpl userDetails = getCurrentUser();
        User approver = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        request.setStatus(RequestStatus.REJECTED);
        request.setApprovedBy(approver);
        request.setApprovedDate(LocalDateTime.now());

        return borrowRequestRepository.save(request);
    }

    @Transactional
    public BorrowRequest returnRequest(Long id) {
        BorrowRequest request = getRequestById(id);

        if (request.getStatus() != RequestStatus.APPROVED) {
            throw new BadRequestException("Only approved requests can be returned");
        }

        // Update equipment availability
        Equipment equipment = request.getEquipment();
        equipment.setAvailableQty(equipment.getAvailableQty() + request.getQuantity());
        equipmentRepository.save(equipment);

        // Update request status
        request.setStatus(RequestStatus.RETURNED);
        request.setReturnedDate(LocalDateTime.now());

        return borrowRequestRepository.save(request);
    }

    private UserDetailsImpl getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetailsImpl) authentication.getPrincipal();
    }
}

