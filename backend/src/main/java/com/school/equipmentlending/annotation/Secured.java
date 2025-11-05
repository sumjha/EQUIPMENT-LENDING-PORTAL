package com.school.equipmentlending.annotation;

import com.school.equipmentlending.model.UserRole;
import jakarta.ws.rs.NameBinding;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Custom annotation for securing JAX-RS resources
 * Binds the JwtAuthenticationFilter to annotated methods/classes
 */
@NameBinding
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface Secured {
    UserRole[] roles() default {};
}

