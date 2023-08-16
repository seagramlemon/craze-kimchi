package com.kimchi.craze.notice.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kimchi.craze.notice.model.dao.NoticeMapper;
import com.kimchi.craze.notice.model.vo.Notice;

@Service
public class NoticeService {
	@Autowired
	private NoticeMapper noticeMapper;
	
	public List noticeList() {
		// TODO Auto-generated method stub
		return noticeMapper.selectNoticeList();
	}

	public List changeStatus(Notice notice) {
		int result = noticeMapper.changeStatus(notice);
		if(result == 0) {
			return null;
		}
		return noticeMapper.selectNoticeList();
	}

}
