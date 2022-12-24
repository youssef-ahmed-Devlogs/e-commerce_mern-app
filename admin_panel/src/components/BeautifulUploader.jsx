function BeautifulUploader(props) {
  // width= w-xl, w-lg, w-md, w-sm
  const { label, width } = props;

  return (
    <div className={`beautiful-uploader-item ${width ? width : ""}`}>
      {label && label.text && <label>{label.text}</label>}
      <label htmlFor={label.for} className="design">
        Upload {label.text}
      </label>
      <input {...{ ...props, label: undefined }} type="file" />
    </div>
  );
}

export default BeautifulUploader;
