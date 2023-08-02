package com.kimchi.craze;


import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
	@Autowired
	private JavaMailSender sender;
	
	public String authMail(String email) {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		//영어 소문자, 영어 대문자, 숫자 8자리
		Random r = new Random();
		
		StringBuffer sb = new StringBuffer();
		for(int i=0;i<8;i++) {
			// 0 ~ 9 : r.nextInt(10); //0부터 매개변수 개수중 랜덤수 1개
			// A ~ Z : (char)(r.nextInt(26)+65);
			// a ~ z : (char)(r.nextInt(26)+97);
			//0,1,2
			int flag = r.nextInt(3);
			if(flag == 0) {
				//0~9
				int randomNumber = r.nextInt(10);
				sb.append(randomNumber);
			}else if(flag == 1) {
				//A-Z
				char randomChar = (char)(r.nextInt(26)+65);
				sb.append(randomChar);
			}else if(flag == 2) {
				//a-z
				char randomChar = (char)(r.nextInt(26)+97);
				sb.append(randomChar);
			}
		}
		
		try {
			helper.setSentDate(new Date());
			helper.setFrom(new InternetAddress("khdsaclass@gmail.com","CRAZE KIMCHI"));
			helper.setTo(email);
			helper.setSubject("CRAZE KIMCHI 인증메일입니다.");
			helper.setText("<h1>안녕하세요. CRAZE KIMCHI 입니다.</h1>"
							+"<h3>인증번호는 [<span style='color:red;'>"
							+sb.toString()
							+"</span>] 입니다.</h3>", true);
			sender.send(message);
			
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			sb = null;
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			sb = null;
			e.printStackTrace();
		}
		return sb.toString();
	}
}	
