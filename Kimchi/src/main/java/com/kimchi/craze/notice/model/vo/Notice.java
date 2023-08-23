package com.kimchi.craze.notice.model.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("notice")
public class Notice {
	private int noticeNo;
	private String noticeTitle;
	private String noticeContent;
	private int noticeReadCount;
	private String noticeRegDate;
	private int noticeStatus;
	private List fileList;
}
