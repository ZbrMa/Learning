import {
  IoIosInformationCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import "./alert.css";
import { useAlert } from "../../../context/alertContext";
import ReactDOM from "react-dom";

type AlertProps = {
  children: React.ReactNode;
  type: "positive" | "negative" | "neutral" | "alert";
  title?: string;
};

export function Alert({ children, type, title }: AlertProps) {
  const { closeAlert } = useAlert();

  return ReactDOM.createPortal(
    <div className={`alert__container ${type}`}>
      {type === "positive" && <IoCheckmarkDoneOutline />}
      {type === "neutral" && <IoIosInformationCircleOutline />}
      {type === "negative" && <IoIosCloseCircleOutline />}
      {type === "alert" && <IoIosInformationCircleOutline />}
      <div className="alert__content">
        {title && <h3 className="alert--title h-xs xbold mb-8">{title}</h3>}

        <p className="alert__body">{children}</p>
      </div>
      <button onClick={closeAlert} className="alert--button">
        <MdOutlineClose />
      </button>
    </div>,
    document.body
  );
}
