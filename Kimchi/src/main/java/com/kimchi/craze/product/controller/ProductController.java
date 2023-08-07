package com.kimchi.craze.product.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kimchi.craze.product.model.service.ProductService;
import com.kimchi.craze.product.model.vo.Product;

@RestController
@RequestMapping(value="/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@PostMapping(value="insert")
	public int insertProduct(@ModelAttribute Product product, 
							 @ModelAttribute MultipartFile upfile, 
							 HttpSession session) {
		
		String originName = upfile.getOriginalFilename();

		String currentTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

		int ranNum = (int)(Math.random() * 90000 + 10000);

		String ext = originName.substring(originName.lastIndexOf("."));
		
		String changeName = currentTime + ranNum + ext;
		
		String savePath = session.getServletContext().getRealPath("/resources/productFiles/");

		try {
			upfile.transferTo(new File(savePath + changeName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		product.setThumbnailImg("resources/productFiles" + changeName);
		
		return productService.insertProduct(product);
	}

	
	
}
