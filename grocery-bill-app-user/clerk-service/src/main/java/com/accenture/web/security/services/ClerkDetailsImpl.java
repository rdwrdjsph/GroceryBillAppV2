package com.accenture.web.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.accenture.web.domain.Clerk;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ClerkDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Integer id;

	private String username;

	private String email;

	@JsonIgnore
	private String password;

	private String firstName;

	private String lastName;

	private String gender;

	private String contactNumber;

	private Collection<? extends GrantedAuthority> authorities;

	public ClerkDetailsImpl(Integer id, String username, String email, String password, String firstName,
			String lastName, String gender, String contactNumber, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.contactNumber = contactNumber;
		this.gender = gender;
		this.authorities = authorities;
	}

	public static ClerkDetailsImpl build(Clerk clerk) {
		List<GrantedAuthority> authorities = clerk.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());

		return new ClerkDetailsImpl(clerk.getId(), clerk.getUsername(), clerk.getEmail(), clerk.getPassword(),
				clerk.getFirstName(), clerk.getLastName(), clerk.getGender(), clerk.getContactNumber(), authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public int getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getGender() {
		return gender;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ClerkDetailsImpl clerk = (ClerkDetailsImpl) o;
		return Objects.equals(id, clerk.id);
	}
}
