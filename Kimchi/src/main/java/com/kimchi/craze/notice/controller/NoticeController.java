package com.kimchi.craze.notice.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kimchi.craze.FileUtil;
import com.kimchi.craze.notice.model.service.NoticeService;
import com.kimchi.craze.notice.model.vo.Notice;
import com.kimchi.craze.notice.model.vo.NoticeFile;

@RestController
@RequestMapping(value = "/notice")
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

	@GetMapping(value = "/list/{currentPage}")
	public Map list(@PathVariable(required = true) int currentPage) {
		System.out.println(currentPage);
		Map map = noticeService.list(currentPage);
		return map;
	}

	@GetMapping(value = "/view/{noticeNo}")
	public Notice noticeView(@PathVariable(required = true) int noticeNo) {
		return noticeService.noticeDetail(noticeNo);
	}

	@GetMapping(value = "/allList")
	public List noticeList() {
		return noticeService.noticeList();
	}

	@PostMapping(value = "/changeStatus")
	public List changeStatus(@RequestBody Notice notice) {
		return noticeService.changeStatus(notice);

	}

	@PostMapping(value = "/insert")
	public int insert(@ModelAttribute Notice n, @ModelAttribute MultipartFile[] upfiles) {

		ArrayList<NoticeFile> list = new ArrayList<NoticeFile>();

		if (upfiles != null) {
			String basePath = (osName.contains("win")) ? windowsPath : macPath;
			basePath += "notice/file/";
			for (MultipartFile file : upfiles) {
				String noticeFilePath = fileutil.getFilepath(basePath, file.getOriginalFilename(), file);
				NoticeFile noticeFile = new NoticeFile();
				noticeFile.setNoticeFileName(file.getOriginalFilename());
				noticeFile.setNoticeFilePath(noticeFilePath);
				list.add(noticeFile);
			}
		}
		n.setFileList(list);
		int result = noticeService.insertNotice(n);
		if (result == 1 + list.size()) {
			return 1;
		} else {
			return 0;
		}

	}

	@PostMapping(value = "/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		System.out.println(image);
		String basePath = (osName.contains("win")) ? windowsPath : macPath;
		basePath += "notice/editor/";
		String filepath = fileutil.getFilepath(basePath, image.getOriginalFilename(), image);
		return "http://localhost:8888/notice/editor/" + filepath;
	}

	@GetMapping(value = "/filedownload/{fileNo}")
	public ResponseEntity<Resource> filedownload(@PathVariable(required = true) int fileNo, HttpServletRequest request)
			throws UnsupportedEncodingException, FileNotFoundException {
		String basePath = (osName.contains("win")) ? windowsPath : macPath;
		basePath += "notice/file/";
		NoticeFile noticeFile = noticeService.getNoticeFile(fileNo);
		HttpHeaders header = new HttpHeaders();
		File file = new File(basePath + noticeFile.getNoticeFilePath());
		Resource resource = new InputStreamResource(new FileInputStream(file));
		String endcodeFile = URLEncoder.encode(noticeFile.getNoticeFileName(), "UTF-8");
		
		header.add("Content-Disposition", "attachment; filename=" + "\"" + endcodeFile + "\"");
		header.add("Cache-Control", "no-cache, no-store, must-revalidate");
		header.add("Pragma", "no-cache");
		header.add("Expires", "0");

		return ResponseEntity.status(HttpStatus.OK).headers(header).contentLength(file.length())
				.contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
	}

}
