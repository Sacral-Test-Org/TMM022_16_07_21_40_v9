package com.example.partmaster.controller;

import com.example.partmaster.dto.PartDetailsDTO;
import com.example.partmaster.service.PartMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partmaster")
public class PartMasterController {

    @Autowired
    private PartMasterService partMasterService;

    @PostMapping("/savePartDetails")
    public ResponseEntity<?> savePartDetails(@RequestBody PartDetailsDTO partDetailsDTO) {
        try {
            partMasterService.savePartDetails(partDetailsDTO);
            return ResponseEntity.ok("Part details saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/validateUnit")
    public ResponseEntity<?> validateUnit(@RequestParam String unitId, @RequestParam String unitName) {
        try {
            partMasterService.validateUnit(unitId, unitName);
            return ResponseEntity.ok("Unit validation successful.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/validatePartNumber")
    public ResponseEntity<?> validatePartNumber(@RequestParam String partNumber) {
        try {
            partMasterService.validatePartNumber(partNumber);
            return ResponseEntity.ok("Part number validation successful.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/validateGroup")
    public ResponseEntity<?> validateGroup(@RequestParam String groupId, @RequestParam String groupName) {
        try {
            partMasterService.validateGroup(groupId, groupName);
            return ResponseEntity.ok("Group validation successful.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
