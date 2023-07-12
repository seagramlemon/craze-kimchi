package com.kimchi.craze.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kimchi.craze.member.model.service.MemberService;
import com.kimchi.craze.member.model.vo.Member;

@RestController(value = "memberController")
@RequestMapping(value="/member")
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	@GetMapping(value="/list")
	public List memberList() {
		List<Member> list = memberService.selectMemberList();
		return list;
	}
	@GetMapping(value="/test")
	public Member member(Member member) {
		
		Member m = memberService.selectOneMember(member);
		return m;
	}
	
}
