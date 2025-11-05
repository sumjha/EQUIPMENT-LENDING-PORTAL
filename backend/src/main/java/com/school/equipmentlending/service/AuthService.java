package com.school.equipmentlending.service;

import com.school.equipmentlending.dto.JwtResponse;
import com.school.equipmentlending.dto.LoginRequest;
import com.school.equipmentlending.dto.MessageResponse;
import com.school.equipmentlending.dto.RegisterRequest;
import com.school.equipmentlending.exception.BadRequestException;
import com.school.equipmentlending.model.User;
import com.school.equipmentlending.repository.UserRepository;
import com.school.equipmentlending.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;

/**
 * Service for Authentication operations
 */
@Slf4j
public class AuthService {

    private final UserRepository userRepository = new UserRepository();
    private final JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();

    public MessageResponse registerUser(RegisterRequest registerRequest) {
        // Check if username already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPasswordHash(BCrypt.hashpw(registerRequest.getPassword(), BCrypt.gensalt()));
        user.setEmail(registerRequest.getEmail());
        user.setFullName(registerRequest.getFullName());
        user.setRole(registerRequest.getRole());

        userRepository.save(user);
        log.info("User registered successfully: {}", user.getUsername());

        return new MessageResponse("User registered successfully");
    }

    public JwtResponse loginUser(LoginRequest loginRequest) {
        // Find user by username
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new BadRequestException("Invalid username or password"));

        // Verify password
        if (!BCrypt.checkpw(loginRequest.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid username or password");
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole().name());
        
        log.info("User logged in successfully: {}", user.getUsername());

        return new JwtResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRole().name()
        );
    }
}
