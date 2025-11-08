package com.school.equipmentlending.controller;

import com.school.equipmentlending.dto.BorrowRequestDto;
import com.school.equipmentlending.model.BorrowRequest;
import com.school.equipmentlending.service.BorrowRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class BorrowRequestController {

    @Autowired
    private BorrowRequestService borrowRequestService;

    @GetMapping
    public ResponseEntity<List<BorrowRequest>> getAllRequests() {
        return ResponseEntity.ok(borrowRequestService.getAllRequests());
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<BorrowRequest>> getOverdueRequests() {
        return ResponseEntity.ok(borrowRequestService.getOverdueRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BorrowRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(borrowRequestService.getRequestById(id));
    }

    @PostMapping
    public ResponseEntity<BorrowRequest> createRequest(@Valid @RequestBody BorrowRequestDto requestDto) {
        return ResponseEntity.ok(borrowRequestService.createRequest(requestDto));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<BorrowRequest> approveRequest(@PathVariable Long id) {
        return ResponseEntity.ok(borrowRequestService.approveRequest(id));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<BorrowRequest> rejectRequest(@PathVariable Long id) {
        return ResponseEntity.ok(borrowRequestService.rejectRequest(id));
    }

    @PutMapping("/{id}/return")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<BorrowRequest> returnRequest(@PathVariable Long id) {
        return ResponseEntity.ok(borrowRequestService.returnRequest(id));
    }
}

