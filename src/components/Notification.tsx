import { FC, useState } from "react";
import CloseIcon from "../assets/close-icon.svg";
import ErroIcon from "../assets/error-icon.svg";
import SuccessIcon from "../assets/success-icon.svg";
import WarningIcon from "../assets/warning-icon.svg";

type TNotificationType = "error" | "warning" | "success";

type TNotificationProps = {
  message: string;
  type?: TNotificationType;
};

export const Notification: FC<TNotificationProps> = ({
  message,
  type = "success",
}) => {
  const [show, setShow] = useState(true);

  const NotificationIcon =
    type === "error"
      ? ErroIcon
      : type === "warning"
      ? WarningIcon
      : SuccessIcon;

  return (
    <div className="h-12 text-xl flex justify-between items-center py-2 px-3 rounded-xl fixed bottom-20 right-10 w-1/2 bg-red-700 text-white">
      <div className="flex items-center gap-2">
        <img className="h-6" src={NotificationIcon} />
        <p>{message}</p>
      </div>
      <img className="h-6" src={CloseIcon} />
    </div>
  );
};
