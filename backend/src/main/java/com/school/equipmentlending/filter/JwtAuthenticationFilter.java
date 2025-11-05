package com.school.equipmentlending.filter;

import com.school.equipmentlending.annotation.Secured;
import com.school.equipmentlending.model.UserRole;
import com.school.equipmentlending.security.JwtTokenProvider;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * JAX-RS Filter for JWT Authentication
 * Intercepts requests to secured resources and validates JWT tokens
 */
@Provider
@Secured
@Priority(Priorities.AUTHENTICATION)
@Slf4j
public class JwtAuthenticationFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    private final JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Missing or invalid Authorization header");
            requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\": \"Missing or invalid authorization token\"}")
                    .build()
            );
            return;
        }

        String token = authHeader.substring(7);

        try {
            if (!jwtTokenProvider.validateToken(token)) {
                log.warn("Invalid JWT token");
                requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED)
                        .entity("{\"error\": \"Invalid or expired token\"}")
                        .build()
                );
                return;
            }

            // Extract user information from token
            String username = jwtTokenProvider.getUsernameFromToken(token);
            String role = jwtTokenProvider.getRoleFromToken(token);
            
            log.debug("Authenticated user: {} with role: {}", username, role);

            // Set user information in request context
            requestContext.setProperty("username", username);
            requestContext.setProperty("role", role);

            // Check role-based authorization
            Method method = resourceInfo.getResourceMethod();
            Secured secured = method.getAnnotation(Secured.class);
            
            if (secured == null) {
                secured = resourceInfo.getResourceClass().getAnnotation(Secured.class);
            }

            if (secured != null && secured.roles().length > 0) {
                UserRole userRole = UserRole.valueOf(role);
                boolean hasRole = Arrays.asList(secured.roles()).contains(userRole);
                
                if (!hasRole) {
                    log.warn("User {} with role {} attempted to access restricted resource", username, role);
                    requestContext.abortWith(
                        Response.status(Response.Status.FORBIDDEN)
                            .entity("{\"error\": \"Insufficient permissions\"}")
                            .build()
                    );
                }
            }

        } catch (Exception e) {
            log.error("Error validating JWT token", e);
            requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\": \"Authentication failed\"}")
                    .build()
            );
        }
    }
}

