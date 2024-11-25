import "./spinner.css";

type SpinnerProps = {
  fixed?: boolean;
};

export function Spinner({ fixed = true }: SpinnerProps) {
  if (fixed) {
    return (
      <div className="spinner__container">
        <div className="spinner__inner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }
  return <div className="spinner"></div>;
}
