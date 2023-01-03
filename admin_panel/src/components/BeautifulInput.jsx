function BeautifulInput(props) {
  // width= w-xl, w-lg, w-md, w-sm
  const { label, type, width, errors } = props;

  const textarea = () => {
    return (
      <textarea
        {...{ ...props, label: undefined, errors: undefined }}
        className={`form-control ${props.className ? props.className : ""}`}
      ></textarea>
    );
  };

  const input = () => {
    return (
      <input
        {...{ ...props, label: undefined, errors: undefined }}
        className={`form-control ${props.className ? props.className : ""}`}
      />
    );
  };

  return (
    <div className={`beautiful-input-item ${width ? width : ""}`}>
      {label && label.text && <label htmlFor={label.for}>{label.text}</label>}

      {type == "textarea" ? textarea() : input()}

      {errors && errors[label.for] && (
        <small className="text-danger fw-bold">{errors[label.for]}</small>
      )}
    </div>
  );
}

export default BeautifulInput;
