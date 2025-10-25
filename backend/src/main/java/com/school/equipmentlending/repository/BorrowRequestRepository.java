package com.school.equipmentlending.repository;

import com.school.equipmentlending.model.BorrowRequest;
import com.school.equipmentlending.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRequestRepository extends JpaRepository<BorrowRequest, Long> {
    
    List<BorrowRequest> findByUserId(Long userId);
    
    List<BorrowRequest> findByStatus(RequestStatus status);
    
    List<BorrowRequest> findByUserIdAndStatus(Long userId, RequestStatus status);
    
    List<BorrowRequest> findByEquipmentId(Long equipmentId);
    
    List<BorrowRequest> findByEquipmentIdAndStatus(Long equipmentId, RequestStatus status);
    
    List<BorrowRequest> findAllByOrderByRequestDateDesc();
    
    List<BorrowRequest> findByUserIdOrderByRequestDateDesc(Long userId);
}

