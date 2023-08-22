package com.kimchi.craze;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableScheduling
@EnableTransactionManagement
public class KimchiFolderConfiguration implements WebMvcConfigurer {
	
	@Value("${file.upload.path.windows}")
	private String windowsPath;

	@Value("${file.upload.path.mac}")
	private String macPath;

	String osName = System.getProperty("os.name").toLowerCase();

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		String basePath = (osName.contains("win")) ? windowsPath : macPath;
		
		registry.addResourceHandler("/product/**").addResourceLocations("file:///" + basePath);
		registry.addResourceHandler("/notice/editor/**").addResourceLocations("file:///" + basePath+"notice/editor/");
	}
}
