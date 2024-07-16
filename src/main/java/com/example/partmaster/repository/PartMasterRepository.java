package com.example.partmaster.repository;

import com.example.partmaster.entity.PartMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PartMasterRepository extends JpaRepository<PartMaster, Long> {

    @Query("SELECT COUNT(p) > 0 FROM PartMaster p WHERE p.unitId = :unitId AND p.groupId = :groupId AND p.lineId = :lineId AND p.partNo = :partNo")
    boolean existsByPartDetails(@Param("unitId") String unitId, @Param("groupId") String groupId, @Param("lineId") String lineId, @Param("partNo") String partNo);

    @Query("SELECT COUNT(p) > 0 FROM PartMaster p WHERE p.partNo = :partNo AND :globalParam = 0")
    boolean existsByPartNumberInEIIS(@Param("partNo") String partNo, @Param("globalParam") int globalParam);

    @Query("SELECT COUNT(p) > 0 FROM PartMaster p WHERE p.partNo = :partNo AND :globalParam = 1")
    boolean existsByPartNumberInHPM(@Param("partNo") String partNo, @Param("globalParam") int globalParam);

    @Query("SELECT COUNT(u) > 0 FROM MesUnitMaster u WHERE u.unitId = :unitId AND u.unitName = :unitName")
    boolean existsByUnitIdAndUnitName(@Param("unitId") String unitId, @Param("unitName") String unitName);

    @Query("SELECT COUNT(g) > 0 FROM MesGroupMaster g WHERE g.groupId = :groupId AND g.groupName = :groupName AND g.groupStatus = 'O' AND g.groupSection = :unitId")
    boolean existsByGroupIdAndGroupNameInMes(@Param("groupId") String groupId, @Param("groupName") String groupName, @Param("unitId") String unitId);

    @Query("SELECT COUNT(g) > 0 FROM MesGroupMaster g, PartMaster p WHERE g.groupId = p.groupId AND g.groupName = :groupName AND p.unitId = :unitId")
    boolean existsByGroupIdAndGroupNameInHPM(@Param("groupId") String groupId, @Param("groupName") String groupName, @Param("unitId") String unitId);
}
