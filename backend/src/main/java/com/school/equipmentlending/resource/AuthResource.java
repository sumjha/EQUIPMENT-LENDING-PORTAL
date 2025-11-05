package com.school.equipmentlending.resource;

import com.school.equipmentlending.dto.JwtResponse;
import com.school.equipmentlending.dto.LoginRequest;
import com.school.equipmentlending.dto.MessageResponse;
import com.school.equipmentlending.dto.RegisterRequest;
import com.school.equipmentlending.service.AuthService;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

/**
 * JAX-RS Resource for Authentication
 * Handles user registration and login
 */
@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class AuthResource {

    private final AuthService authService = new AuthService();

    @POST
    @Path("/register")
    public Response registerUser(@Valid RegisterRequest registerRequest) {
        log.info("Registration request for username: {}", registerRequest.getUsername());
        MessageResponse response = authService.registerUser(registerRequest);
        return Response.ok(response).build();
    }

    @POST
    @Path("/login")
    public Response loginUser(@Valid LoginRequest loginRequest) {
        log.info("Login request for username: {}", loginRequest.getUsername());
        JwtResponse response = authService.loginUser(loginRequest);
        return Response.ok(response).build();
    }
}

