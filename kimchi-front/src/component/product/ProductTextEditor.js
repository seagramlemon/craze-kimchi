import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "./TextEditor.css";
import "react-quill/dist/quill.snow.css"; // react-quill과 css파일 import 하기
import axios from "axios";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

const ProductTextEditor = (props) => {
  const quillRef = useRef();
  const data = props.data;
  const setData = props.setData;

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    const input = document.createElement("input");
    const formData = new FormData();

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append("image", file[0]);
        console.log(formData, file[0]);
        axios({
          url: "/product/contentImg",
          method: "post",
          data: formData,
          headers: {
            processData: false,
            contentType: "multipart/form-data",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
          .then(function (response) {
            const url = response.data;
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", url);
            editor.setSelection(range.index + 1);
          })
          .catch(function (res) {
            console.log(res);
            console.log("실패");
          });
      }
    };
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
  ];
  const modules = useMemo(() => {
    return {
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

        handlers: {
          // 위에서 만든 이미지 핸들러 사용하도록 설정
          image: imageHandler,
        },
      },
      imageResize: {
        // https://www.npmjs.com/package/quill-image-resize-module-react 참고
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={data}
      formats={formats}
      onChange={setData}
      modules={modules}
      placeholder={props.placeholder}
    />
  );
};

export default ProductTextEditor;
