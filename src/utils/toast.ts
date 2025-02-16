import { toast } from "sonner";

export function successNotification(message: string, description = "") {
  toast.success(message, {
    description: description,
    closeButton: true,
  });
}

export function errorNotification(message: string, description = "") {
  toast.error(message, {
    description: description,
    closeButton: true,
  });
}

export function warningNotification(message: string, description = "") {
  toast.warning(message, {
    description: description,
    closeButton: true,
  });
}

export function infoNotification(message: string, description = "") {
  toast.info(message, {
    description: description,
    closeButton: true,
  });
}
