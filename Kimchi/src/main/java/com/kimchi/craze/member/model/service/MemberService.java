package com.kimchi.craze.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kimchi.craze.EmailSender;
import com.kimchi.craze.JwtUtil;
import com.kimchi.craze.member.model.dao.MemberMapper;
import com.kimchi.craze.member.model.vo.Member;

@Service(value="memberService")
public class MemberService {
	@Autowired
	private MemberMapper memberMapper;
	@Autowired
	private EmailSender emailSender;
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	@Value("${jwt.secret}")
	private String secretKey;
	
	private Long expiredMs = 1000*60*60l;

	public Member selectOneMember(String memberId) {
		// TODO Auto-generated method stub
		System.out.println("service :" + memberId);
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
	@Transactional
	public int insertMember(Member member) {
		// TODO Auto-generated method stub
		String encodePw = bcrypt.encode(member.getMemberPw());
		member.setMemberPw(encodePw);
		return memberMapper.insertMember(member);
	}

	public String selectOneMember(Member member) {
		Member m = memberMapper.selectOneMember(member.getMemberId());
		if(m != null) {
			
			boolean result = bcrypt.matches(member.getMemberPw(), m.getMemberPw());
			if(result) {
				return JwtUtil.createToken(member.getMemberId(), secretKey, expiredMs);
			}
		}
		return null;
	}
	
	

	

}


