package com.kimchi.craze.notice.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kimchi.craze.FileUtil;
import com.kimchi.craze.notice.model.service.NoticeService;
import com.kimchi.craze.notice.model.vo.Notice;

@RestController
@RequestMapping(value="/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	@Value("${file.upload.path.windows}")
	private String windowsPath;
	@Value("${file.upload.path.mac}")
	private String macPath;
	String osName = System.getProperty("os.name").toLowerCase();
	@Autowired
	private FileUtil fileutil;
	
	@GetMapping(value="/list")
	public List noticeList() {
		return noticeService.noticeList();
	}
	
	@PostMapping(value="/changeStatus")
	public List changeStatus(@RequestBody Notice notice) {
		return noticeService.changeStatus(notice);
		
	}
	
	@ResponseBody
	@PostMapping(value="/contentImg")
	public String contentImg(MultipartFile image) {
		String basePath = (osName.contains("win")) ? windowsPath : macPath;
		basePath += "notice/editor/";
		String filepath = fileutil.getFilepath(basePath, image.getOriginalFilename(),image);
		return "http://localhost:8888/notice/editor/"+filepath;
	}

}
