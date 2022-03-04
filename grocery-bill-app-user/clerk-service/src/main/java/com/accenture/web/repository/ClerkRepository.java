package com.accenture.web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.accenture.web.domain.Clerk;

@Repository
public interface ClerkRepository extends JpaRepository<Clerk, Integer>{
	Optional<Clerk> findByUsername(String username);
	
	Boolean existsByUsername(String username);
	
	Boolean existsByEmail(String email);

}
