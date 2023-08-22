package com.kimchi.craze.product.model.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import com.kimchi.craze.product.model.vo.Product;

@Mapper
public interface ProductMapper {

	int insertProduct(Product product);
	
	int selectListCount();

	ArrayList<Product> selectListProduct(HashMap<String, Integer> hm);

	ArrayList<Product> selectMainListProduct();

}
