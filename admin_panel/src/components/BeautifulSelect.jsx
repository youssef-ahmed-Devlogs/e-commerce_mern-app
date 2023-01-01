function BeautifulSelect(props) {
  const { label, errors } = props;

  return (
    <div className="beautiful-input-item">
      {label && label.text && <label htmlFor={label.for}>{label.text}</label>}
      <select
        {...{ ...props, label: undefined }}
        className={`form-control ${props.className ? props.className : ""}`}
      >
        {props.children}
      </select>

      {errors && errors[label.for] && (
        <small className="text-danger fw-bold">{errors[label.for]}</small>
      )}
    </div>
  );
}

export default BeautifulSelect;
