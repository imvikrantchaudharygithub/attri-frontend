type EditAddressPopUpProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function EditAddressPopUp({ isOpen = false, onClose }: EditAddressPopUpProps) {
  if (!isOpen) return null;

  const closePopup = onClose ?? (() => {});

  return (
    <div
      className="fixed inset-0 z-[123] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-address-title"
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={closePopup} />
      <div
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-xl"
        style={{ borderColor: "var(--color-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h2 id="edit-address-title" className="text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
            Edit address
          </h2>
          <button
            type="button"
            onClick={closePopup}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5" style={{ maxHeight: "calc(90vh - 72px)" }}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  placeholder="Name"
                  className="w-full min-h-[44px] rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1"
                />
              </div>
              <div>
                <label htmlFor="edit-mobile" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Mobile number
                </label>
                <input
                  id="edit-mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  className="w-full min-h-[44px] rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1"
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full min-h-[48px] cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                style={{ background: "var(--color-primary)" }}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
