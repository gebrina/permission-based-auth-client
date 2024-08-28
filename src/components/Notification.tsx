import { FC } from "react";

type TNotificationType = "error" | "warning" | "success";

type TNotificationProps = {
  message: string;
  type?: TNotificationType;
};

export const Notification: FC<TNotificationProps> = ({ message }) => {
  return (
    <div className="h-12 text-xl animate-ping py-2 px-3 rounded-xl fixed bottom-20 right-10 w-1/2 bg-red-700 text-white">
      <p>{message}</p>
    </div>
  );
};
