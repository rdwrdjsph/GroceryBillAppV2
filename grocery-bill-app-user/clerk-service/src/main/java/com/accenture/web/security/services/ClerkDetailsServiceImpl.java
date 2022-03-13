package com.accenture.web.security.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.accenture.web.domain.Clerk;
import com.accenture.web.repository.ClerkRepository;

@Service
public class ClerkDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private ClerkRepository clerkRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Clerk clerk = clerkRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return ClerkDetailsImpl.build(clerk);
	}

	public List<Clerk> getAllClerk() {
		return clerkRepository.findAll();
	}
}
