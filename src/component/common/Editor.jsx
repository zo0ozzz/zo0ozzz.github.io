import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.scss";

export default function Editor({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);
  const quillRef = useRef(null);

  // 델타를 value 값으로 넘기면 좋지 않다고 함.
  // 대신 첫 번째 매개 변수인 HTML 문자열을 value 값으로 할당.
  // const handleChange = (content, delta, source, editor) => {
  const handleChange = (content) => {
    setValue(content);
    onChange(content);
  };

  // 툴바 순서 정하기
  const modules = {
    // toolbar 하위에 여러 key를 가지지 않는다면 객체를 넘기지 않아도 됨.
    // 하지만 여러 key를 주려면 객체를 넘겨야 함.

    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        // default-value 속성을 지정한다.
        [{ font: [] }],
        // [{ size: ["small", false, "large", "huge"] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
        ["code", "code-block"],
      ],
    },
  };
  // 툴바 기능 불러오기
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
    "indent",
    "link",
    "image",
    "code",
    "code-block",
    "custom",
  ];

  return (
    <>
      <ReactQuill
        ref={quillRef}
        className="Editor"
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
        theme={"snow"}
      />
    </>
  );
}
