package com.kimchi.craze;


import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kimchi.craze.member.model.service.MemberService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter{

	private MemberService memberService;

	@Value("${jwt.secret}")
	private  String secretKey;
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("secretKey : "+secretKey);
		String auth = request.getHeader(HttpHeaders.AUTHORIZATION);
		System.out.println("auth : "+auth);
		//인증토큰이 없거나 잘못보내
		if(auth == null || !auth.startsWith("Bearer ")) {
			System.out.println("auth is null or miss");
			filterChain.doFilter(request, response);
			return;
		}
		//token 꺼낵
		String token = auth.split(" ")[1];
		System.out.println(token);
		if(JwtUtil.isExpired(token, secretKey)) {
			System.out.println("auth expired");
			filterChain.doFilter(request, response);
			return;
		}
		String memberId = JwtUtil.getUserId(token, secretKey);
		System.out.println("filter memberId : " + memberId);
		request.setAttribute("memberId", memberId);
		ArrayList<SimpleGrantedAuthority> list = new ArrayList<SimpleGrantedAuthority>();
		list.add(new SimpleGrantedAuthority("USER"));
		UsernamePasswordAuthenticationToken authToken
		= new UsernamePasswordAuthenticationToken(memberId, null,list);
		authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(authToken);
		filterChain.doFilter(request, response);
		
	}

}
