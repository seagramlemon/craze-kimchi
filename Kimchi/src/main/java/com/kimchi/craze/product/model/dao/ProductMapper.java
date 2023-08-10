package com.kimchi.craze.product.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.kimchi.craze.product.model.vo.Product;

@Mapper
public interface ProductMapper {

	int insertProduct(Product product);

	ArrayList<Product> selectListProduct();

}
