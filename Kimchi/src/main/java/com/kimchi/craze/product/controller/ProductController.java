package com.kimchi.craze.product.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kimchi.craze.common.model.vo.PageInfo;
import com.kimchi.craze.common.template.Pagination;
import com.kimchi.craze.product.model.service.ProductService;
import com.kimchi.craze.product.model.vo.Product;

@RestController
@RequestMapping(value="/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@Value("${file.upload.path.windows}")
	private String windowsPath;

	@Value("${file.upload.path.mac}")
	private String macPath;

	String osName = System.getProperty("os.name").toLowerCase();
	
	@PostMapping(value="insert")
	public int insertProduct(@ModelAttribute Product product, 
							 @ModelAttribute MultipartFile upfile, 
							 HttpSession session) {
		
		String originName = upfile.getOriginalFilename();

		String currentTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

		int ranNum = (int)(Math.random() * 90000 + 10000);

		String ext = originName.substring(originName.lastIndexOf("."));
		
		String changeName = currentTime + ranNum + ext;
	
		String basePath = (osName.contains("win")) ? windowsPath : macPath;

		try {
			upfile.transferTo(new File(basePath + changeName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		product.setThumbnailImg(changeName);
		
		return productService.insertProduct(product);
	}
	
	@GetMapping(value="mainList")
	public ArrayList<Product> selectMainListProduct() {
		
		ArrayList<Product> list = productService.selectMainListProduct();
		
		return list;
	}

	@GetMapping(value="list")
	public HashMap<String, Object> selectListProduct(@RequestParam(defaultValue="1") int currentPage) {
		
		int listCount = productService.selectListCount();
		
		int pageLimit = 5;
		int boardLimit = 6;
		
		PageInfo pi = Pagination.getPageInfo(listCount, currentPage, pageLimit, boardLimit);
		
		HashMap<String, Integer> hm = new HashMap<>();

		int startRow = (pi.getCurrentPage() - 1) * pi.getBoardLimit() + 1;
		int endRow = startRow + pi.getBoardLimit() - 1;
		
		hm.put("startRow", startRow);
		hm.put("endRow", endRow);
		
		ArrayList<Product> list = productService.selectListProduct(hm);
		
		System.out.println();
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i));
		}
		System.out.println();
		
		System.out.println(pi);
		
		System.out.println();
		
		HashMap<String, Object> result = new HashMap<>();
		result.put("list", list);
		result.put("pi", pi);
		
		return result;
		
	}
	
}
