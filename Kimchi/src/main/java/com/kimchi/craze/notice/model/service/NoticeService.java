package com.kimchi.craze.notice.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kimchi.craze.notice.model.dao.NoticeMapper;
import com.kimchi.craze.notice.model.vo.Notice;
import com.kimchi.craze.notice.model.vo.NoticeFile;

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
	@Transactional
	public int insertNotice(Notice n) {
		int result = noticeMapper.insertNotice(n);
		for(Object obj : n.getFileList()) {
			NoticeFile nf = (NoticeFile)obj;
			nf.setNoticeNo(n.getNoticeNo());
			result += noticeMapper.insertNoticeFile(nf);
		}
		return result;
	}

}
