package com.kimchi.craze;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@GetMapping(value="/")
	public String home() {
		return "Hello Craze Kimchi";
	}
	@GetMapping(value="/test")
	public String test() {
		return "Craze Kimchi";
	}
}
