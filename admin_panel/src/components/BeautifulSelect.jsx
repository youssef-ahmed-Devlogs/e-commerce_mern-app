function BeautifulSelect(props) {
  const { label } = props;

  return (
    <div className="beautiful-input-item">
      {label && label.text && <label htmlFor={label.for}>{label.text}</label>}
      <select
        {...{ ...props, label: undefined }}
        className={`form-control ${props.className ? props.className : ""}`}
      >
        {props.children}
      </select>
    </div>
  );
}

export default BeautifulSelect;
