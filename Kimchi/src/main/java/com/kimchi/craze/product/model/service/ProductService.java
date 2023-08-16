package com.kimchi.craze.product.model.service;

import java.util.ArrayList;

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

	public ArrayList<Product> selectListProduct() {
		return productMapper.selectListProduct();
	}

}
