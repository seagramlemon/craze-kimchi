package com.kimchi.craze.notice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kimchi.craze.notice.model.service.NoticeService;
import com.kimchi.craze.notice.model.vo.Notice;

@RestController
@RequestMapping(value="/notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping(value="/list")
	public List noticeList() {
		return noticeService.noticeList();
	}
	
	@PostMapping(value="/changeStatus")
	public List changeStatus(@RequestBody Notice notice) {
		return noticeService.changeStatus(notice);
		
	}

}
