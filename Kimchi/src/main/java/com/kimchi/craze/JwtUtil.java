package com.kimchi.craze;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
	
	public static String createToken(String memberId, String secretKey, long expiredMs) {
		System.out.println("utils11 : "+secretKey);
		Claims claims = Jwts.claims();
		claims.put("memberId", memberId);
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+expiredMs))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
	public static boolean isExpired(String token, String secretKey) {
		System.out.println("token22 :"+token);
		System.out.println("utils22 : "+secretKey);
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration().before(new Date());
	}
	public static String getUserId(String token, String secretKey) {
		Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("memberId",String.class);
	}
}
