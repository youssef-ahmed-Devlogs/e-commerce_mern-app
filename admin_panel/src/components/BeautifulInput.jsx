function BeautifulInput(props) {
  // width= w-xl, w-lg, w-md, w-sm
  const { label, width } = props;

  return (
    <div className={`beautiful-input-item ${width ? width : ""}`}>
      {label && label.text && <label htmlFor={label.for}>{label.text}</label>}
      <input
        {...{ ...props, label: undefined }}
        className={`form-control ${props.className ? props.className : ""}`}
      />
    </div>
  );
}

export default BeautifulInput;
