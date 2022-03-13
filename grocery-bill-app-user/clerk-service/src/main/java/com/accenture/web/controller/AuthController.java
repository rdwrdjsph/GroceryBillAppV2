package com.accenture.web.controller;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.domain.Clerk;
import com.accenture.web.domain.ERole;
import com.accenture.web.domain.Role;
import com.accenture.web.payload.request.LoginRequest;
import com.accenture.web.payload.request.SignupRequest;
import com.accenture.web.payload.response.JwtResponse;
import com.accenture.web.payload.response.MessageResponse;
import com.accenture.web.repository.ClerkRepository;
import com.accenture.web.repository.RoleRepository;
import com.accenture.web.security.jwt.JwtUtils;
import com.accenture.web.security.services.ClerkDetailsImpl;
import com.accenture.web.security.services.ClerkDetailsServiceImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	ClerkRepository clerkRepository;

	@Autowired
	ClerkDetailsServiceImpl clerkDetails;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtUtils jwtUtils;

	@GetMapping("clerk-list")
	public List<Clerk> getAllClerk() {
		return clerkDetails.getAllClerk();
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateClerk(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		ClerkDetailsImpl clerkDetails = (ClerkDetailsImpl) authentication.getPrincipal();
		List<String> roles = clerkDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, clerkDetails.getId(), clerkDetails.getUsername(),
				clerkDetails.getEmail(), clerkDetails.getFirstName(), clerkDetails.getLastName(),
				clerkDetails.getGender(), clerkDetails.getContactNumber(), roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerClerk(@Valid @RequestBody SignupRequest signUpRequest) {
		if (clerkRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (clerkRepository.existsByEmail(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
		}

		// CREATE NEW CLERKS'S ACCOUNT
		Clerk clerk = new Clerk(signUpRequest.getUsername(), signUpRequest.getEmail(),
				passwordEncoder.encode(signUpRequest.getPassword()), signUpRequest.getFirstName(),
				signUpRequest.getLastName(), signUpRequest.getGender(), signUpRequest.getContactNumber());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "SUPER_ADMIN":
					Role sadminRole = roleRepository.findByName(ERole.ROLE_SUPER_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(sadminRole);
					break;

				case "ADMIN":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;

				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		clerk.setRoles(roles);
		clerkRepository.save(clerk);

		return ResponseEntity.ok(new MessageResponse("Registered successfully!"));
	}
}
