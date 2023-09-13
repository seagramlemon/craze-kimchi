package com.kimchi.craze.product.model.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kimchi.craze.product.model.dao.ProductMapper;
import com.kimchi.craze.product.model.vo.Product;

@Service
public class ProductService {
	
	@Autowired
	private ProductMapper productMapper;

	public int insertProduct(Product product) {
		return productMapper.insertProduct(product);
	}

	public int selectListCount() {
		return productMapper.selectListCount();
	}

	public ArrayList<Product> selectListProduct(HashMap<String, Integer> hm) {
		return productMapper.selectListProduct(hm);
	}

	public ArrayList<Product> selectMainListProduct() {
		return productMapper.selectMainListProduct();
	}

	public Product selectOneProduct(int pNo) {
		return productMapper.selectOneProduct(pNo);
	}

	public int updateProduct(Product p) {
		return productMapper.updateProduct(p);
	}

	public int deleteProduct(int productNo) {
		return productMapper.deleteProduct(productNo);
	}

}
