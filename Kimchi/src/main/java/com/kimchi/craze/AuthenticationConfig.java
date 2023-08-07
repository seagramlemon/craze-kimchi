package com.kimchi.craze;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authorization.AuthenticatedAuthorizationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.kimchi.craze.member.model.service.MemberService;

@EnableWebSecurity
@Configuration
public class AuthenticationConfig {
	@Autowired
	private MemberService memberService;
	@Value("${jwt.secret}")
	private String secretKey;
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
 
        return http
        		.httpBasic().disable()			//토큰인증으로 인증 수행 
        		.csrf().disable()				//
        		.cors().and()
        		.authorizeRequests()		//request를 인증
        		.antMatchers(HttpMethod.POST,"/member/login","/member/enroll").permitAll()			//인증 안해도 되는url
        		.antMatchers(HttpMethod.POST).authenticated()	//인증 해야하는 url
        		.antMatchers(HttpMethod.GET,"/member/mypage").authenticated()
        		.and()
        		.sessionManagement()
        		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)	//jwt사용시 설정해야
        		.and()
        		.addFilterBefore(new JwtFilter(memberService,secretKey), UsernamePasswordAuthenticationFilter.class)
        		.build();
    }
}
