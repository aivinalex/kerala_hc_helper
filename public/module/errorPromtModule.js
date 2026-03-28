const typeStyles = {
    error: {
        border: "border-red-300",
        text: "text-red-700",
    },
    success: {
        border: "border-green-300",
        text: "text-green-700",
    },
    warning: {
        border: "border-yellow-300",
        text: "text-yellow-700",
    },
};
export const createMessage = function ({ message, messageType, title, isTimer = false, }) {
    const messageStyle = typeStyles[messageType];
    const overlay = document.createElement("div");
    overlay.className = `
    fixed inset-0 flex items-center justify-center
    bg-black/20 backdrop-blur-sm z-50
  `;
    const box = document.createElement("div");
    box.className = `relative bg-[#fffdf6] border ${messageStyle.border} rounded-2xl shadow-lg px-6 py-5  max-w-md w-[90%] flex flex-col  h-48
  `;
    const boxTitle = document.createElement("h2");
    boxTitle.textContent = title ?? messageType.toUpperCase();
    boxTitle.className = `font-semibold text-lg justify-center text-center ${messageStyle.text}`;
    const messageEl = document.createElement("p");
    messageEl.textContent = message;
    messageEl.className = `flex-1 flex items-center justify-center text-[#3b2f2a] text-sm text-center`;
    const closeButton = document.createElement("button");
    closeButton.textContent = "✕";
    closeButton.className = ` absolute top-3 right-3 text-[#8b6f47] hover:text-[#3b2f2a]`;
    box.append(closeButton, boxTitle, messageEl);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    const closeBox = function () {
        overlay.remove();
        document.removeEventListener("keydown", escapeKey);
        overlay.removeEventListener("click", onOverlayClick);
        closeButton.removeEventListener("click", onCloseClick);
    };
    const escapeKey = function (e) {
        if (e.key === "Escape")
            closeBox();
    };
    const onOverlayClick = function (e) {
        if (e.target === overlay)
            closeBox();
    };
    const onCloseClick = function (e) {
        if (e.target === closeButton)
            closeBox();
    };
    document.addEventListener("keydown", escapeKey);
    overlay.addEventListener("click", onOverlayClick);
    closeButton.addEventListener("click", onCloseClick);
    if (isTimer) {
        setTimeout(closeBox, 3000);
    }
    return { closeBox };
};
