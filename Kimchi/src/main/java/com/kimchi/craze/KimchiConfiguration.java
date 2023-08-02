package com.kimchi.craze;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class KimchiConfiguration {

	@Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder(); 
        
        // 회원가입 시
        // 암호화작업 (솔트 + 단방향, 복호화불가)
        // String encPwd = bcryptPasswordEncoder.encode(m.getUserPwd());
        
        // 로그인 시
        // DB 로부터는 아이디만 일치하는지 검사 후 Controller 에서
		// matches(평문, 암호문) 을 작성하면 내부적으로 복호화 등의 작업이 이루어져
		// 두 구문이 일치하는지 비교 후 일치한다면 true 반환
		// if(loginUser != null && bcryptPasswordEncoder.matches(m.getUserPwd(), loginUser.getUserPwd())) {
		
        // 이런식으로 하시면됩미다
        
    }
}
