package com.kimchi.craze.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kimchi.craze.EmailSender;
import com.kimchi.craze.member.model.dao.MemberMapper;
import com.kimchi.craze.member.model.vo.Member;

@Service(value="memberService")
public class MemberService {
	@Autowired
	private MemberMapper memberMapper;
	@Autowired
	private EmailSender emailSender;

	public Member selectOneMember(String memberId) {
		// TODO Auto-generated method stub
		return memberMapper.selectOneMember(memberId);
	}

	public String sendMail(Member member) {
		String check = memberMapper.emailCheck(member.getMemberEmail());
		if(check.equals("1")){
			return "1";
		}else {
			return emailSender.authMail(member.getMemberEmail());
		}
	}
	
	

	

}
