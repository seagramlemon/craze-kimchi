import { useCallback, useMemo } from "react";
import ReactQuill from "react-quill";
import "./TextEditor.css";
import "react-quill/dist/quill.snow.css"; // react-quill과 css파일 import 하기
import axios from "axios";

const TextEditor = (props) => {
  const data = props.data;
  const setData = props.setData;
  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append("image", file[0]);
        axios({
          url: "/notice/contentImg",
          method: "post",
          data: formData,
          headers: {
            processData: false,
            contentType: "multipart/form-data",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function () {
            console.log("실패");
          });
        /*
  // 저의 경우 파일 이미지를 서버에 저장했기 때문에
      // 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
      try {
        const res = ""
        //axios를 통해 백엔드 개발자분과 통신했고, 데이터는 폼데이터로 주고받았습니다.

  // 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
        url = res.data.url;

  // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드 
      // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
        const range = QuillRef.current?.getEditor().getSelection()?.index;
        if (range !== null && range !== undefined) {
          let quill = QuillRef.current?.getEditor();

          quill?.setSelection(range, 1);

          quill?.clipboard.dangerouslyPasteHTML(
            range,
            `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
          );
        }

        return { ...res, success: true };
      } catch (error) {
        const err = error as AxiosError;
        return { ...err.response, success: false };
      }*/
      }
    };
  };
  const editorToolbarOptions = {
    toolbar: {
      // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        ["image", "video"],
      ],
      /*
      handlers: {
        // 위에서 만든 이미지 핸들러 사용하도록 설정
        image: imageHandler,
      },
      */
    },
  };
  return (
    <ReactQuill
      theme="snow"
      value={data}
      onChange={setData}
      modules={editorToolbarOptions}
    />
  );
};

export default TextEditor;
