package com.kimchi.craze.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kimchi.craze.member.model.dao.MemberMapper;
import com.kimchi.craze.member.model.vo.Member;

@Service(value="memberService")
public class MemberService {
	@Autowired
	private MemberMapper memberMapper;
	
	public List<Member> selectMemberList() {
		
		return memberMapper.memberList();
	}

}
