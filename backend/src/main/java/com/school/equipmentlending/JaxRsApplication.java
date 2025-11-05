package com.school.equipmentlending;

import com.school.equipmentlending.filter.CorsFilter;
import com.school.equipmentlending.filter.JwtAuthenticationFilter;
import com.school.equipmentlending.resource.AuthResource;
import com.school.equipmentlending.resource.BorrowRequestResource;
import com.school.equipmentlending.resource.EquipmentResource;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

import java.util.HashSet;
import java.util.Set;

/**
 * JAX-RS Application Configuration
 * Defines the base path and registers all resources and providers
 */
@ApplicationPath("/")
public class JaxRsApplication extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        
        // Register Resources
        classes.add(AuthResource.class);
        classes.add(EquipmentResource.class);
        classes.add(BorrowRequestResource.class);
        
        // Register Filters
        classes.add(JwtAuthenticationFilter.class);
        classes.add(CorsFilter.class);
        
        // Register Exception Mappers
        classes.add(com.school.equipmentlending.exception.GlobalExceptionHandler.class);
        
        return classes;
    }
}

