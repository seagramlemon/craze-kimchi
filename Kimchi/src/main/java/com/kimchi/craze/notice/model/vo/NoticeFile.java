package com.kimchi.craze.notice.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="noticeFile")
public class NoticeFile {
	private int noticeFileNo;
	private String noticFileImg;
	private int noitceNo;
}
