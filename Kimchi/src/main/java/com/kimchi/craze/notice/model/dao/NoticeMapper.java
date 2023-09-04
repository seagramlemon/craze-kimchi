package com.kimchi.craze.notice.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kimchi.craze.notice.model.vo.Notice;
import com.kimchi.craze.notice.model.vo.NoticeFile;

@Mapper
public interface NoticeMapper {

	List selectNoticeList();

	int changeStatus(Notice notice);

	int insertNotice(Notice n);

	int insertNoticeFile(NoticeFile nf);

	int totalCount();

	List list(HashMap<String, Object> param);

	int updateReadCount(int noticeNo);

	Notice noticeDetail(int noticeNo);

	NoticeFile getNoticeFile(int fileNo);

	

}
