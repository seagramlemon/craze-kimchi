package com.kimchi.craze.member.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Alias(value = "member")
public class Member {
	private String memberId;
	private String memberPw;
	private String memberName;
	private int memberAge;
	private int memberLevel;
}
