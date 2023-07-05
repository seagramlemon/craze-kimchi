import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [text, setText] = useState([]);
  useEffect(() => {
    axios
      .get("/test") //로그인 되어있다고 가정하고 아이디 user01
      .then((res) => {
        setText(res.data);
        console.log(1);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);
  return (
    <div className="App">
      <div>{text} 수정</div>
    </div>
  );
}

export default App;
