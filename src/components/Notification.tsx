import { FC, useEffect, useState } from "react";
import ErroIcon from "../assets/error-icon.svg";
import SuccessIcon from "../assets/success-icon.svg";
import WarningIcon from "../assets/warning-icon.svg";
import { CloseIcon } from "../icons";

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

  useEffect(() => {
    const notifactionTimeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(notifactionTimeout);
  }, []);

  const hideNotification = () => setShow(false);

  const NotificationIcon =
    type === "error"
      ? ErroIcon
      : type === "warning"
      ? WarningIcon
      : SuccessIcon;

  return (
    show && (
      <div
        className={`
     bg-gradient-to-tl
      ${
        type === "error"
          ? "from-red-600 to-red-950"
          : type === "success"
          ? "from-green-600 to-green-950"
          : "from-yellow-600 to-yellow-950"
      }
    h-12 animate-slide-left text-lg 
            flex justify-between items-center py-2
            px-3 rounded-xl fixed top-32 right-2 
            md:right-16 w-4/5 sm:w-1/2 md:w-1/3 
            lg:w-1/4 xl:w-1/5   text-white
  `}
      >
        <div className="flex items-center gap-2">
          <img className="h-6" src={NotificationIcon} />
          <p>{message}</p>
        </div>
        <CloseIcon
          onClick={hideNotification}
          styleClass={`cursor-pointer hover:animate-pulse ${
            type === "error"
              ? "fill-red-100"
              : type === "success"
              ? "fill-green-100"
              : "fill-yellow-100"
          } `}
        />
      </div>
    )
  );
};
