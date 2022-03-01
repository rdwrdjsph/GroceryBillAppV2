package com.accenture.web.service;

import java.util.List;

import com.accenture.web.domain.ShoppingClerk;

public interface ShoppingClerkService {
	public ShoppingClerk saveClerk(ShoppingClerk clerk);
	public List<ShoppingClerk> getAllClerks();
	public ShoppingClerk getClerkById(Integer clerk);
}
