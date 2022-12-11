function BeautifulInput(props) {
  const { label } = props;

  return (
    <div className="beautiful-input-item">
      {label && label.text && <label htmlFor={label.for}>{label.text}</label>}
      <input
        {...{ ...props, label: undefined }}
        className={`form-control ${props.className ? props.className : ""}`}
      />
    </div>
  );
}

export default BeautifulInput;
