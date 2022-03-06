package com.accenture.web;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.accenture.web.domain.Authority;
import com.accenture.web.domain.ShoppingClerk;
import com.accenture.web.repository.ShoppingClerkRepository;

@SpringBootApplication
public class ClerkServiceApplication {
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ShoppingClerkRepository shoppingClerkRepository;
	

	public static void main(String[] args) {
		SpringApplication.run(ClerkServiceApplication.class, args);
		
	}
	
	@PostConstruct
	protected void init() {
		List<Authority> authorityList = new ArrayList<>();
		
		authorityList.add(createAuthority("USER", "User Role"));
		authorityList.add(createAuthority("ADMIN", "Admin Role"));
		authorityList.add(createAuthority("SADMIN", "Super Admin Role"));
		
		ShoppingClerk clerk = new ShoppingClerk();
		
		clerk.setUsername("sadmin01");
		clerk.setFirstName("Edward");
		clerk.setLastName("Rodriguez");
		clerk.setPassword(passwordEncoder.encode("sadmin@123"));
		clerk.setEnabled(true);
		clerk.setAuthorities(authorityList);
		
		//shoppingClerkRepository.save(clerk);
	}
	
	private Authority createAuthority(String roleCode,String roleDescription) {
		Authority authority = new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}

}
