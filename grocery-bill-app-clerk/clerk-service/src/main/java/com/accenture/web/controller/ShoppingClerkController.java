package com.accenture.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.domain.ShoppingClerk;
import com.accenture.web.service.ShoppingClerkService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class ShoppingClerkController {
	@Autowired
	private ShoppingClerkService shoppingClerkService;
	
	@PostMapping("/add")
	public String add(@RequestBody ShoppingClerk clerk) {
		shoppingClerkService.saveClerk(clerk);
		return "New Clerk is Added";
	}
	
	@GetMapping("/view")
	public List<ShoppingClerk> getAllClerks() {
		return shoppingClerkService.getAllClerks();
	}
	
	@GetMapping("/view/{clerkId}")
	public ResponseEntity<ShoppingClerk> getClerkId(@PathVariable Integer clerkId) {
		ShoppingClerk existingClerk = shoppingClerkService.getClerkById(clerkId);
		return ResponseEntity.ok(existingClerk);
	}
	
	@GetMapping
	public String testDisplay() {
		return "Hello Clerk!";
	}
}
