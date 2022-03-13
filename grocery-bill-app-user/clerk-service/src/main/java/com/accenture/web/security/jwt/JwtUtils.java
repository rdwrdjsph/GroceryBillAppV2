package com.accenture.web.security.jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.accenture.web.security.services.ClerkDetailsImpl;
import io.jsonwebtoken.*;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	
	@Value("${grocerybill.app.jwtSecret}")
	private String jwtSecret;
	
	@Value("${grocerybill.app.jwtExpirationMs}")
	private int jwtExpirationMs;
	
	public String generateJwtToken(Authentication authentication) {	
		ClerkDetailsImpl userPrincipal = (ClerkDetailsImpl) authentication.getPrincipal();
		
		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
	public String getUsernameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}
	
	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch(SignatureException e) {
			logger.error("Invalid JWT Signature: {}", e.getMessage());
		} catch(MalformedJwtException e) {
			logger.error("Invalid JWT Token: {}", e.getMessage());
		} catch(ExpiredJwtException e) {
			logger.error("JWT Token is Expired: {}", e.getMessage());
		} catch(UnsupportedJwtException e) {
			logger.error("JWT Token is Unsupported: {}", e.getMessage());
		} catch(IllegalArgumentException e) {
			logger.error("JWT Claims String is Empty: {}", e.getMessage());
		}
		
		return false;
	}

}
