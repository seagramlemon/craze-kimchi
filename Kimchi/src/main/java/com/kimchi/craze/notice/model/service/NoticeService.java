package com.kimchi.craze.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kimchi.craze.common.model.vo.PageInfo;
import com.kimchi.craze.common.template.Pagination;
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
			System.out.println(nf);
			result += noticeMapper.insertNoticeFile(nf);
		}
		return result;
	}

	public Map list(int currentPage) {
		int totalCount = noticeMapper.totalCount();

		int numPerPage = 15;
		int pageNaviSize = 5;
		PageInfo pi = Pagination.getPageInfo(totalCount, currentPage, pageNaviSize, numPerPage);
		
		int end = currentPage*numPerPage;
		int start = end - numPerPage +1;
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("start", start);
		map.put("end",end);
		
		List list = noticeMapper.list(map);
		
		map.put("list",list);
		map.put("pi", pi);
		
		return map;
	}
	
	@Transactional
	public Notice noticeDetail(int noticeNo) {
		int result = noticeMapper.updateReadCount(noticeNo);
		Notice n = noticeMapper.noticeDetail(noticeNo);
		return n;
	}

	public NoticeFile getNoticeFile(int fileNo) {
		// TODO Auto-generated method stub
		return noticeMapper.getNoticeFile(fileNo);
	}

}
