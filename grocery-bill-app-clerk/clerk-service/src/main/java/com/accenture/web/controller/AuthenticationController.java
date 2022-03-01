package com.accenture.web.controller;


import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.config.JWTTokenHelper;
import com.accenture.web.domain.ShoppingClerk;
import com.accenture.web.requests.AuthenticationRequest;
import com.accenture.web.responses.ClerkInfo;
import com.accenture.web.responses.LoginResponse;

@RestController
@RequestMapping("/")
@CrossOrigin
public class AuthenticationController {
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JWTTokenHelper jwtTokenHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@PostMapping("auth/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException{
		final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUserName(), authenticationRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		ShoppingClerk clerk = (ShoppingClerk)authentication.getPrincipal();
		String jwtToken = jwtTokenHelper.generateToken(clerk.getUsername());
		
		LoginResponse response = new LoginResponse();
		response.setToken(jwtToken);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/auth/clerkinfo")
	public ResponseEntity<?> getUserInfo(Principal user){
		ShoppingClerk clerkObj=(ShoppingClerk) userDetailsService.loadUserByUsername(user.getName());
		
		ClerkInfo clerkInfo=new ClerkInfo();
		clerkInfo.setFirstName(clerkObj.getFirstName());
		clerkInfo.setLastName(clerkObj.getLastName());
		clerkInfo.setRoles(clerkObj.getAuthorities().toArray());
		
		
		return ResponseEntity.ok(clerkInfo);	
		
	}
}
