function FancyCheckbox(props) {
  return (
    <div className={`fancy-checkbox-item`}>
      <label className="title">{props.title}</label>
      <input
        {...props}
        type="checkbox"
        className={`fancy-checkbox ${props.className ? props.className : ""}`}
      />
      <label htmlFor={props.id}>
        <span className="bullet"></span>
      </label>
    </div>
  );
}

export default FancyCheckbox;
