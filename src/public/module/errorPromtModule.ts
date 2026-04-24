type MessageType = "error" | "success" | "warning";

interface MessageOption {
  message: string;
  title?: string;
  messageType: MessageType;
  isTimer?: number;
}
type Style = {
  border: string;
  text: string;
};

type StyleMap = Record<MessageType, Style>;

const typeStyles: StyleMap = {
  error: {
    border: "border-red-200/50",
    text: "text-red-600",
  },
  success: {
    border: "border-emerald-200/50",
    text: "text-emerald-700",
  },
  warning: {
    border: "border-amber-200/50",
    text: "text-amber-700",
  },
};

type MessageReturn = {
  closeBox: () => void;
};

export const createMessage = function ({
  message,
  messageType,
  title,
  isTimer,
}: MessageOption): MessageReturn {
  const messageStyle = typeStyles[messageType];

  const overlay = document.createElement("div");
  overlay.className = ` fixed inset-0 flex items-center justify-center bg-stone-900/10 backdrop-blur-[2px] z-[100] transition-opacity duration-300
  `;
  const box = document.createElement("div");
  box.className = ` bg-[#fffdf6] border-4 ${messageStyle.border}  rounded-xl shadow-2xl shadow-stone-200/50  ring-1 ring-black/5  p-8 max-w-sm w-[90%] flex flex-col items-center animate-in fade-in zoom-in duration-200 relative`;
  const boxTitle = document.createElement("h2");
  boxTitle.textContent = title ?? messageType.toUpperCase();
  boxTitle.className = ` text-[10px] uppercase tracking-[0.2em] font-black mb-4${messageStyle.text}`;
  const messageEl = document.createElement("p");
  messageEl.textContent = message;
  messageEl.className = ` text-stone-800 text-sm leading-relaxed text-center font-medium `;
  const closeButton = document.createElement("button");
  closeButton.textContent = "✕";
  closeButton.className = ` absolute top-4 right-4  z-[110] text-stone-500 hover:text-stone-900 text-lg font-bold transition-all duration-200  cursor-pointer p-2   leading-none`;
  box.append(closeButton, boxTitle, messageEl);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  const closeBox = function (): void {
    overlay.remove();

    document.removeEventListener("keydown", escapeKey);
    overlay.removeEventListener("click", onOverlayClick);
    closeButton.removeEventListener("click", closeBox);
  };
  const escapeKey = function (e: KeyboardEvent): void {
    if (e.key === "Escape") closeBox();
  };

  const onOverlayClick = function (e: MouseEvent): void {
    if (e.target === overlay) closeBox();
  };

  document.addEventListener("keydown", escapeKey);
  overlay.addEventListener("click", onOverlayClick);
  closeButton.addEventListener("click", closeBox);

  if (isTimer) {
    setTimeout(closeBox, isTimer);
  }

  return { closeBox };
};
