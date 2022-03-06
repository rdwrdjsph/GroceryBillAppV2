package com.accenture.web.repository;

import com.accenture.web.domain.ShoppingClerk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingClerkRepository extends JpaRepository<ShoppingClerk, Integer> {
	ShoppingClerk findByUserName(String username);
}
