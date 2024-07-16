package com.example.partmaster.service;

import com.example.partmaster.repository.PartMasterRepository;
import com.example.partmaster.dto.PartDetailsDTO;
import com.example.partmaster.exception.PartAlreadyExistsException;
import com.example.partmaster.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartMasterService {

    @Autowired
    private PartMasterRepository partMasterRepository;

    public void savePartDetails(PartDetailsDTO partDetails) {
        validatePartDetails(partDetails);

        boolean partExists = partMasterRepository.existsByPartDetails(
                partDetails.getUnitId(), 
                partDetails.getGroupId(), 
                partDetails.getLineId(), 
                partDetails.getPartNo()
        );

        if (partExists) {
            throw new PartAlreadyExistsException("Part number already exists for the same unit, group, and line.");
        }

        partMasterRepository.save(partDetails);
    }

    private void validatePartDetails(PartDetailsDTO partDetails) {
        if (partDetails.getPartId() == null) {
            throw new ValidationException("Please choose data from the list of values before changing the part description.");
        }
        if (partDetails.getUnitName() == null) {
            throw new ValidationException("Please enter the UNIT_ID.");
        }
        if (partDetails.getGroupName() == null) {
            throw new ValidationException("Please enter the GROUP_ID.");
        }
        if (partDetails.getLineDesc() == null) {
            throw new ValidationException("Please enter the LINE_DESC.");
        }
        if (partDetails.getPartNo() == null) {
            throw new ValidationException("Please enter the PARTNO.");
        }
        if (partDetails.getPartDesc() == null) {
            throw new ValidationException("Please enter the PART_DESC.");
        }
        if (partDetails.getPartStatus() == null) {
            throw new ValidationException("Please enter the PART_STATUS.");
        }
    }

    public void validateUnitIdAndName(String unitId, String unitName, int globalParameter) {
        boolean isValid;
        if (globalParameter == 0) {
            isValid = partMasterRepository.existsInMesUnitMaster(unitId, unitName);
        } else {
            isValid = partMasterRepository.existsInMesUnitMasterAndHpmPartMaster(unitId, unitName);
        }

        if (!isValid) {
            throw new ValidationException("Invalid UNIT_ID or UNIT_NAME.");
        }
    }

    public void validatePartNumber(String partNo, int globalParameter) {
        boolean isValid;
        if (globalParameter == 0) {
            isValid = partMasterRepository.existsInEiisPartMaster(partNo);
        } else {
            isValid = partMasterRepository.existsInHpmPartMaster(partNo);
        }

        if (!isValid) {
            throw new ValidationException("Invalid PARTNO.");
        }
    }

    public void validateGroupIdAndName(String groupId, String groupName, String unitId, int globalParameter) {
        boolean isValid;
        if (globalParameter == 0) {
            isValid = partMasterRepository.existsInMesGroupMaster(groupId, groupName, unitId);
        } else {
            isValid = partMasterRepository.existsInMesGroupMasterAndHpmPartMaster(groupId, groupName, unitId);
        }

        if (!isValid) {
            throw new ValidationException("Invalid GROUP_ID or GROUP_NAME.");
        }
    }
}
