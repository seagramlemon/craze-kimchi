package com.kimchi.craze.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.kimchi.craze.member.model.vo.Member;

@Mapper
public interface MemberMapper {
	
	public Member selectOneMember(String memberId);

	public String emailCheck(String memberEmail);

	public int insertMember(Member member);
	
}
