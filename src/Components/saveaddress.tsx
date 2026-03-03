import { useState } from "react";

type SaveAddressProps = {
  address: {
    _id?: string;
    id?: string;
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    contact?: string;
    type?: string;
    isDefault?: boolean;
  };
  defaultAddress: (addressId: string) => void;
  deleteAddress: (addressId: string) => void;
};

export default function SaveAddress({ address, defaultAddress, deleteAddress }: SaveAddressProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const addressId = address?._id ?? address?.id;

  const deleteAddressHandler = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteAddress(id);
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const isDefault = address?.isDefault === true;

  return (
    <article
      className={`relative rounded-2xl border p-6 transition-colors ${
        isDefault ? "ring-2 ring-[var(--color-primary)]" : ""
      }`}
      style={{
        borderColor: isDefault ? "var(--color-primary)" : "var(--color-border)",
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <label className="flex cursor-pointer flex-1 items-start gap-4">
          <input
            type="radio"
            name="defaultAddress"
            checked={isDefault}
            onChange={() => addressId && defaultAddress(addressId)}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-primary)]"
            aria-label="Set as default address"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold" style={{ color: "var(--color-charcoal)" }}>
                {address?.name}
              </span>
              <span
                className="shrink-0 rounded-full px-3 py-0.5 text-xs font-medium"
                style={{
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                }}
              >
                {address?.type === "office" ? "Office" : "Home"}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {address?.street}, {address?.city}, {address?.state} – {address?.pincode}
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Mobile: +91 {address?.contact}
            </p>
          </div>
        </label>
      </div>

      <div className="mt-5 flex items-center border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => addressId && deleteAddressHandler(addressId)}
          disabled={isDeleting}
          className="inline-flex min-h-[40px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          {isDeleting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Removing…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 17" fill="none" aria-hidden>
                <path
                  d="M14.6667 2.66666H1.33333C0.5 2.66666 0 3.49999 0 4.33332V5.16666H16V4.33332C16 3.49999 15.5 2.66666 14.6667 2.66666ZM12.1642 4.33332H3.83583L4.60917 15.1667H11.3908L12.1642 4.33332ZM9.66667 0.166656H6.33333C5.5 0.166656 5 0.99999 5 1.83332V2.66666H11V1.83332C11 0.99999 10.5 0.166656 9.66667 0.166656Z"
                  fill="currentColor"
                />
              </svg>
              Remove
            </>
          )}
        </button>
      </div>
    </article>
  );
}
