function BeautifulInput(props) {
  // width= w-xl, w-lg, w-md, w-sm
  const { label, width, errors } = props;

  return (
    <div className={`beautiful-input-item ${width ? width : ""}`}>
      {label && label.text && <label htmlFor={label.for}>{label.text}</label>}
      <input
        {...{ ...props, label: undefined, errors: undefined }}
        className={`form-control ${props.className ? props.className : ""}`}
      />

      {errors && errors[label.for] && (
        <small className="text-danger fw-bold">{errors[label.for]}</small>
      )}
    </div>
  );
}

export default BeautifulInput;
