package com.kimchi.craze.member.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kimchi.craze.member.model.service.MemberService;
import com.kimchi.craze.member.model.vo.Member;

@RestController(value = "memberController")
@RequestMapping(value="/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping(value="{memberId}")
	public Member checkMember(@PathVariable String memberId) {
		return memberService.selectOneMember(memberId);
		
	}
	
	@PostMapping(value="authMail")
	public String authMail(@RequestBody Member member) {
		return memberService.sendMail(member);
	}
	
	@PostMapping(value="enroll")
	public int insertMember(@RequestBody Member member) {
		return memberService.insertMember(member);
	}
	
}
