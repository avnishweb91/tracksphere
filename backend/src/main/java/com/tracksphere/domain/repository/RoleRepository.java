package com.tracksphere.domain.repository; import com.tracksphere.domain.model.Role; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface RoleRepository extends JpaRepository<Role,Long>{ Optional<Role> findByName(String name); }
