package com.accenture.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.ShoppingClerk;
import com.accenture.web.repository.ShoppingClerkRepository;


@Service
public class ShoppingClerkServiceImpl implements ShoppingClerkService {
	@Autowired
	private ShoppingClerkRepository shoppingClerkRepository;
	
	@Override
	public ShoppingClerk saveClerk(ShoppingClerk clerk) {
		return shoppingClerkRepository.save(clerk);
	}
	
	@Override
	public List<ShoppingClerk> getAllClerks() {
		return shoppingClerkRepository.findAll();
	}
	
	@Override
	public ShoppingClerk getClerkById(Integer clerkId) {
		return shoppingClerkRepository.findById(clerkId).get();
	}
}
