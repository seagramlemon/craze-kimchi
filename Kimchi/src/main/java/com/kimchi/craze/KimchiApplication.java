package com.kimchi.craze;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class KimchiApplication {

	public static void main(String[] args) {
		SpringApplication.run(KimchiApplication.class, args);
	}

}
