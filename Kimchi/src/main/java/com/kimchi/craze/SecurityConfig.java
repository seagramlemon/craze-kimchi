package com.kimchi.craze;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//CORS 허용 
@Configuration
public class SecurityConfig implements WebMvcConfigurer{
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            // 메서드 허용
            .allowedMethods(
            		HttpMethod.POST.name(), HttpMethod.GET.name(), 
            		HttpMethod.PUT.name(), HttpMethod.DELETE.name(), 
            		HttpMethod.OPTIONS.name()
                );
    }
}
