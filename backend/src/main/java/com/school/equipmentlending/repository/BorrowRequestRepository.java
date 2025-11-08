package com.school.equipmentlending.repository;

import com.school.equipmentlending.model.BorrowRequest;
import com.school.equipmentlending.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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
    
    // Find all overdue approved requests
    @Query("SELECT br FROM BorrowRequest br WHERE br.status = 'APPROVED' AND br.dueDate < :currentDate")
    List<BorrowRequest> findOverdueRequests(@Param("currentDate") LocalDate currentDate);
    
    // Find overdue requests for a specific user
    @Query("SELECT br FROM BorrowRequest br WHERE br.user.id = :userId AND br.status = 'APPROVED' AND br.dueDate < :currentDate")
    List<BorrowRequest> findOverdueRequestsByUserId(@Param("userId") Long userId, @Param("currentDate") LocalDate currentDate);
}

