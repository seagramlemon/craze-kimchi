package com.kimchi.craze.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kimchi.craze.notice.model.vo.Notice;

@Mapper
public interface NoticeMapper {

	List selectNoticeList();

	int changeStatus(Notice notice);

	

}