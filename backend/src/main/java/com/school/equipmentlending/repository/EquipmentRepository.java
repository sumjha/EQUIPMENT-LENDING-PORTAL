package com.school.equipmentlending.repository;

import com.school.equipmentlending.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    
    List<Equipment> findByCategory(String category);
    
    List<Equipment> findByAvailableQtyGreaterThan(Integer quantity);
    
    @Query("SELECT e FROM Equipment e WHERE " +
           "(:category IS NULL OR e.category = :category) AND " +
           "(:available IS NULL OR (:available = true AND e.availableQty > 0) OR (:available = false))")
    List<Equipment> findByFilters(@Param("category") String category, 
                                  @Param("available") Boolean available);
    
    @Query("SELECT e FROM Equipment e WHERE " +
           "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Equipment> searchByKeyword(@Param("keyword") String keyword);
}

