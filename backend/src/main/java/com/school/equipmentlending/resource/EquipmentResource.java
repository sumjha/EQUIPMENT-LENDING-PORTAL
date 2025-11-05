package com.school.equipmentlending.resource;

import com.school.equipmentlending.annotation.Secured;
import com.school.equipmentlending.dto.EquipmentRequest;
import com.school.equipmentlending.dto.MessageResponse;
import com.school.equipmentlending.model.Equipment;
import com.school.equipmentlending.model.UserRole;
import com.school.equipmentlending.service.EquipmentService;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * JAX-RS Resource for Equipment Management
 * Handles CRUD operations for equipment
 */
@Path("/equipment")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class EquipmentResource {

    private final EquipmentService equipmentService = new EquipmentService();

    @GET
    @Secured
    public Response getAllEquipment(
            @QueryParam("category") String category,
            @QueryParam("available") Boolean available
    ) {
        log.info("Fetching equipment - category: {}, available: {}", category, available);
        List<Equipment> equipment;
        
        if (category != null || available != null) {
            equipment = equipmentService.filterEquipment(category, available);
        } else {
            equipment = equipmentService.getAllEquipment();
        }
        
        return Response.ok(equipment).build();
    }

    @GET
    @Path("/{id}")
    @Secured
    public Response getEquipmentById(@PathParam("id") Long id) {
        log.info("Fetching equipment with id: {}", id);
        Equipment equipment = equipmentService.getEquipmentById(id);
        return Response.ok(equipment).build();
    }

    @GET
    @Path("/search")
    @Secured
    public Response searchEquipment(@QueryParam("keyword") String keyword) {
        log.info("Searching equipment with keyword: {}", keyword);
        List<Equipment> equipment = equipmentService.searchEquipment(keyword);
        return Response.ok(equipment).build();
    }

    @POST
    @Secured(roles = {UserRole.ADMIN})
    public Response createEquipment(@Valid EquipmentRequest request) {
        log.info("Creating equipment: {}", request.getName());
        Equipment equipment = equipmentService.createEquipment(request);
        return Response.status(Response.Status.CREATED).entity(equipment).build();
    }

    @PUT
    @Path("/{id}")
    @Secured(roles = {UserRole.ADMIN})
    public Response updateEquipment(
            @PathParam("id") Long id,
            @Valid EquipmentRequest request
    ) {
        log.info("Updating equipment with id: {}", id);
        Equipment equipment = equipmentService.updateEquipment(id, request);
        return Response.ok(equipment).build();
    }

    @DELETE
    @Path("/{id}")
    @Secured(roles = {UserRole.ADMIN})
    public Response deleteEquipment(@PathParam("id") Long id) {
        log.info("Deleting equipment with id: {}", id);
        MessageResponse response = equipmentService.deleteEquipment(id);
        return Response.ok(response).build();
    }
}

