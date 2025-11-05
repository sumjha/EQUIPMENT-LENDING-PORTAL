package com.school.equipmentlending.resource;

import com.school.equipmentlending.annotation.Secured;
import com.school.equipmentlending.dto.BorrowRequestDto;
import com.school.equipmentlending.model.BorrowRequest;
import com.school.equipmentlending.model.UserRole;
import com.school.equipmentlending.service.BorrowRequestService;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * JAX-RS Resource for Borrow Requests
 * Handles equipment borrowing operations
 */
@Path("/requests")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class BorrowRequestResource {

    private final BorrowRequestService borrowRequestService = new BorrowRequestService();

    @GET
    @Secured
    public Response getAllRequests() {
        log.info("Fetching all borrow requests");
        List<BorrowRequest> requests = borrowRequestService.getAllRequests();
        return Response.ok(requests).build();
    }

    @GET
    @Path("/{id}")
    @Secured
    public Response getRequestById(@PathParam("id") Long id) {
        log.info("Fetching borrow request with id: {}", id);
        BorrowRequest request = borrowRequestService.getRequestById(id);
        return Response.ok(request).build();
    }

    @POST
    @Secured
    public Response createRequest(@Valid BorrowRequestDto requestDto) {
        log.info("Creating borrow request for equipment: {}", requestDto.getEquipmentId());
        BorrowRequest request = borrowRequestService.createRequest(requestDto);
        return Response.status(Response.Status.CREATED).entity(request).build();
    }

    @PUT
    @Path("/{id}/approve")
    @Secured(roles = {UserRole.STAFF, UserRole.ADMIN})
    public Response approveRequest(@PathParam("id") Long id) {
        log.info("Approving borrow request: {}", id);
        BorrowRequest request = borrowRequestService.approveRequest(id);
        return Response.ok(request).build();
    }

    @PUT
    @Path("/{id}/reject")
    @Secured(roles = {UserRole.STAFF, UserRole.ADMIN})
    public Response rejectRequest(@PathParam("id") Long id) {
        log.info("Rejecting borrow request: {}", id);
        BorrowRequest request = borrowRequestService.rejectRequest(id);
        return Response.ok(request).build();
    }

    @PUT
    @Path("/{id}/return")
    @Secured(roles = {UserRole.STAFF, UserRole.ADMIN})
    public Response returnRequest(@PathParam("id") Long id) {
        log.info("Processing return for request: {}", id);
        BorrowRequest request = borrowRequestService.returnRequest(id);
        return Response.ok(request).build();
    }
}

