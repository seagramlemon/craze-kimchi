package com.kimchi.craze.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.kimchi.craze.member.model.vo.Member;

@Mapper
public interface MemberMapper {
	@Select(value = "select * from member_tbl")
	public List<Member> memberList();

	@Select(value = "select * from member_tbl where member_id=#{memberId} and member_pw=#{memberPw}")
	public Member selectOne(Member member);
	
}
