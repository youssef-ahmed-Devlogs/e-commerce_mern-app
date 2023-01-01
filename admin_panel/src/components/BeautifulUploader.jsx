import { ProgressBar } from "react-bootstrap";

function BeautifulUploader(props) {
  // width= w-xl, w-lg, w-md, w-sm
  const { label, errors, width, uploadprogress } = props;

  return (
    <div className={`beautiful-uploader-item ${width ? width : ""}`}>
      {label && label.text && <label>{label.text}</label>}
      <label htmlFor={label.for} className="design mb-2">
        Upload {label.text}
      </label>
      <input {...{ ...props, label: undefined }} type="file" />

      {uploadprogress > 0 && (
        <ProgressBar now={uploadprogress} label={`${uploadprogress}%`} />
      )}

      {errors && errors[label.for] && (
        <small className="text-danger fw-bold">{errors[label.for]}</small>
      )}
    </div>
  );
}

export default BeautifulUploader;
