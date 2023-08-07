package com.kimchi.craze.product.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias(value = "product")
public class Product {
	
	private int productNo;
	private String productName;
	private int price;
	private String detail;
	private String thumbnailImg;
	private int amount;
	private int viewCount;
	private String status;
}
