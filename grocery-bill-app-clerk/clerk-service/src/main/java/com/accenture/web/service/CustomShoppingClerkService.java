package com.accenture.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.ShoppingClerk;
import com.accenture.web.repository.ShoppingClerkRepository;

@Service
public class CustomShoppingClerkService implements UserDetailsService {
	@Autowired
	ShoppingClerkRepository shoppingClerkRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		ShoppingClerk clerk = shoppingClerkRepository.findByUserName(userName);
		
		if(null == clerk) {
			throw new UsernameNotFoundException("Clerk not found with Username: "+ userName);
		}
		
		return clerk;
	}

}
