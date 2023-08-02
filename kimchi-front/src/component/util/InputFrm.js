import "./InputFrm.css";

const Input = (props) => {
  return (
    <>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        className="input-form"
        onBlur={props.func}
      />
    </>
  );
};
const Button = (props) => {
  return (
    <>
      <button className={props.className} onClick={props.func}>
        {props.content}
      </button>
    </>
  );
};
const CheckBox = (props) => {
  const changeIcon = (e) => {
    const input = e.target;
    const icon = input.nextElementSibling;
    if (input.checked) {
      icon.innerText = "check_circle";
    } else {
      icon.innerText = "check_circle_outline";
    }
  };
  const changeCheckbox = (e) => {
    const checkbox = e.target.previousElementSibling;
    checkbox.click();
  };
  return (
    <>
      <input
        type="checkbox"
        className="input-check"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={changeIcon}
      />
      <span className="material-icons" onClick={changeCheckbox}>
        check_circle_outline
      </span>
    </>
  );
};
export { Input, Button, CheckBox };
