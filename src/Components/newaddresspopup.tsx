import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from "@/services/apiServices";
import toast from "react-hot-toast";
import { useAppSelector } from "@/hooks/hooks";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Andaman and Nicobar Islands",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Jammu and Kashmir",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function normalizeStateName(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[().,]/g, " ")
    .replace(/\b(union territory|state|territory|national capital territory|nct)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Match API/geocoder state text to our select options */
function matchStateName(raw: string): string {
  const rawNorm = normalizeStateName(raw);
  if (!rawNorm) return "";

  // Common aliases from geocoders
  const alias: Record<string, string> = {
    "national capital territory of delhi": "Delhi",
    "nct of delhi": "Delhi",
    "delhi": "Delhi",
  };
  const aliased = alias[rawNorm] ?? alias[raw.toLowerCase().trim()] ?? "";
  if (aliased) return aliased;

  const direct = INDIAN_STATES.find((s) => normalizeStateName(s) === rawNorm);
  if (direct) return direct;

  // Fallback fuzzy contains match (kept narrow after normalization)
  const contains =
    INDIAN_STATES.find((s) => rawNorm.includes(normalizeStateName(s))) ??
    INDIAN_STATES.find((s) => normalizeStateName(s).includes(rawNorm));

  return contains ?? "";
}

/** Fetch city (District) + state from India Post PIN code API */
async function lookupPincode(pin: string): Promise<{ city: string; state: string }> {
  const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  if (data[0]?.Status !== "Success" || !data[0].PostOffice?.length) {
    throw new Error("Pincode not found");
  }
  const po = data[0].PostOffice[0];
  return { city: po.District ?? po.Name ?? "", state: po.State ?? "" };
}

/** Reverse geocode coordinates using Nominatim (OpenStreetMap) */
async function reverseGeocode(lat: number, lng: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    { headers: { "Accept-Language": "en" } }
  );
  if (!res.ok) throw new Error("Geocode request failed");
  const d = await res.json();
  const a = d.address ?? {};
  const iso = String(a["ISO3166-2-lvl4"] ?? "").toUpperCase().trim();
  const isoToState: Record<string, string> = {
    "IN-DL": "Delhi",
    "IN-AN": "Andaman and Nicobar Islands",
    "IN-CH": "Chandigarh",
    "IN-DH": "Dadra and Nagar Haveli and Daman and Diu",
    "IN-JK": "Jammu and Kashmir",
    "IN-LA": "Ladakh",
    "IN-LD": "Lakshadweep",
    "IN-PY": "Puducherry",
  };
  const derivedState =
    (a.state ?? "") ||
    isoToState[iso] ||
    (String(a.city ?? "").toLowerCase().trim() === "delhi" ? "Delhi" : "");
  return {
    pincode: (a.postcode ?? "").replace(/\D/g, "").slice(0, 6),
    city: a.city ?? a.town ?? a.district ?? a.village ?? "",
    state: derivedState,
    street: [a.house_number, a.road, a.neighbourhood, a.suburb].filter(Boolean).join(", "),
  };
}

// ─── Shared input class helpers ──────────────────────────────────────────────
const inputBase =
  "w-full min-h-[44px] rounded-xl border bg-transparent px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
const inputNormal = "border-[var(--color-border)] focus:ring-[var(--color-primary)]";
const inputError = "border-red-500 focus:ring-red-400";
const inputSuccess = "border-green-500 focus:ring-green-400";

type PincodeStatus = "idle" | "loading" | "success" | "error";

export default function NewAddressPopUp({ closePopup }: { closePopup: () => void }) {
  const user = useAppSelector((state: any) => state.user);
  const userName = String(user?.name ?? "").trim();
  const [pincodeStatus, setPincodeStatus] = useState<PincodeStatus>("idle");
  const [pincodeHint, setPincodeHint] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formik = useFormik({
    initialValues: {
      name: userName,
      mobileNumber: user?.phone ?? "",
      pincode: "",
      state: "",
      city: "",
      streetAddress: "",
      addressType: "home" as "home" | "office",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid Indian mobile number")
        .length(10, "Must be 10 digits"),
      pincode: Yup.string()
        .required("Pincode is required")
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required").min(2, "At least 2 characters"),
      streetAddress: Yup.string()
        .required("Street address is required")
        .min(3, "At least 3 characters"),
      addressType: Yup.string().required().oneOf(["home", "office"]),
    }),
    onSubmit: async (values) => {
      const data = {
        contact: values.mobileNumber,
        name: values.name,
        street: values.streetAddress,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        type: values.addressType,
        userId: user?.id,
      };
      try {
        const res: any = await postData("add-address", data);
        if (res?.status === 200) {
          closePopup();
          formik.resetForm();
          toast.success("Address added successfully");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  // ── Pincode auto-fill ──────────────────────────────────────────────────────
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    formik.setFieldValue("pincode", val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.length === 6) {
      setPincodeStatus("loading");
      setPincodeHint("");
      debounceRef.current = setTimeout(async () => {
        try {
          const { city, state } = await lookupPincode(val);
          const matched = matchStateName(state);
          formik.setFieldValue("city", city);
          formik.setFieldValue("state", matched || state);
          setPincodeStatus("success");
          setPincodeHint(`${city}, ${matched || state}`);
        } catch {
          setPincodeStatus("error");
          setPincodeHint("Pincode not found. Please fill city & state manually.");
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
        }
      }, 300);
    } else {
      setPincodeStatus("idle");
      setPincodeHint("");
    }
  };

  // ── Use current location ──────────────────────────────────────────────────
  const handleUseLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { pincode, city, state, street } = await reverseGeocode(
            coords.latitude,
            coords.longitude
          );
          const matched = matchStateName(state);
          if (pincode.length === 6) {
            formik.setFieldValue("pincode", pincode);
            setPincodeStatus("success");
            setPincodeHint(`${city}, ${matched || state}`);
          }
          if (city) formik.setFieldValue("city", city);
          if (state) formik.setFieldValue("state", matched || state);
          if (street) formik.setFieldValue("streetAddress", street);
          toast.success("Location detected! Please verify and fill remaining details.");
        } catch {
          toast.error("Could not resolve your location. Please fill in manually.");
        } finally {
          setLocLoading(false);
        }
      },
      (err) => {
        setLocLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          toast.error("Location permission denied. Please enable it in your browser settings.");
        } else if (err.code === err.TIMEOUT) {
          toast.error("Location request timed out. Please try again.");
        } else {
          toast.error("Could not get your location.");
        }
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
    );
  };

  // ── Keyboard + cleanup ────────────────────────────────────────────────────
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") closePopup(); };
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [closePopup]);

  const pincodeBorderClass =
    formik.touched.pincode && formik.errors.pincode
      ? inputError
      : pincodeStatus === "success"
      ? inputSuccess
      : inputNormal;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-address-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={closePopup} />

      {/* Panel */}
      <div
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-xl"
        style={{ borderColor: "var(--color-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h2
            id="add-address-title"
            className="text-lg font-semibold"
            style={{ color: "var(--color-charcoal)" }}
          >
            Add new address
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
          {/* Use current location button */}
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={locLoading}
            className="mb-5 flex w-full items-center justify-center gap-2.5 rounded-xl border py-3 text-sm font-medium transition-colors hover:bg-[var(--color-primary-light)] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
          >
            {locLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Detecting location…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use my current location
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative mb-5 flex items-center">
            <div className="flex-1 border-t" style={{ borderColor: "var(--color-border)" }} />
            <span className="mx-3 text-xs" style={{ color: "var(--color-text-muted)" }}>or fill manually</span>
            <div className="flex-1 border-t" style={{ borderColor: "var(--color-border)" }} />
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
            {/* Name + Mobile */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="na-name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Full name <span className="text-red-500" aria-hidden>*</span>
                </label>
                <input
                  id="na-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter full name"
                  className={`${inputBase} ${formik.touched.name && formik.errors.name ? inputError : inputNormal}`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.name)}</p>
                )}
              </div>
              <div>
                <label htmlFor="na-mobile" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Mobile number <span className="text-red-500" aria-hidden>*</span>
                </label>
                <input
                  id="na-mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  placeholder="10-digit number"
                  className={`${inputBase} ${formik.touched.mobileNumber && formik.errors.mobileNumber ? inputError : inputNormal}`}
                  {...formik.getFieldProps("mobileNumber")}
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.mobileNumber)}</p>
                )}
              </div>
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="na-pincode" className="mb-1.5 flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Pincode <span className="text-red-500" aria-hidden>*</span>
                {pincodeStatus === "loading" && (
                  <span className="inline-flex items-center gap-1 text-xs font-normal" style={{ color: "var(--color-text-muted)" }}>
                    <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Looking up…
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  id="na-pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit pincode"
                  className={`${inputBase} pr-9 ${pincodeBorderClass}`}
                  name="pincode"
                  value={formik.values.pincode}
                  onChange={handlePincodeChange}
                  onBlur={formik.handleBlur}
                />
                {pincodeStatus === "success" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2" aria-hidden>
                    <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                {pincodeStatus === "error" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2" aria-hidden>
                    <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </span>
                )}
              </div>
              {pincodeStatus === "success" && pincodeHint && (
                <p className="mt-1 text-xs text-green-600">✓ Auto-filled: {pincodeHint}</p>
              )}
              {pincodeStatus === "error" && pincodeHint && (
                <p className="mt-1 text-xs text-red-600">{pincodeHint}</p>
              )}
              {formik.touched.pincode && formik.errors.pincode && pincodeStatus !== "error" && (
                <p className="mt-1 text-xs text-red-600">{String(formik.errors.pincode)}</p>
              )}
            </div>

            {/* City + State — auto-filled, still editable */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="na-city" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  City / District <span className="text-red-500" aria-hidden>*</span>
                </label>
                <input
                  id="na-city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="City or district"
                  className={`${inputBase} ${formik.touched.city && formik.errors.city ? inputError : inputNormal}`}
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.city)}</p>
                )}
              </div>
              <div>
                <label htmlFor="na-state" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  State <span className="text-red-500" aria-hidden>*</span>
                </label>
                <select
                  id="na-state"
                  className={`${inputBase} ${formik.touched.state && formik.errors.state ? inputError : inputNormal}`}
                  {...formik.getFieldProps("state")}
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {formik.touched.state && formik.errors.state && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.state)}</p>
                )}
              </div>
            </div>

            {/* Street address */}
            <div>
              <label htmlFor="na-street" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Street address <span className="text-red-500" aria-hidden>*</span>
              </label>
              <input
                id="na-street"
                type="text"
                autoComplete="street-address"
                placeholder="House no., building, area, street"
                className={`${inputBase} ${formik.touched.streetAddress && formik.errors.streetAddress ? inputError : inputNormal}`}
                {...formik.getFieldProps("streetAddress")}
              />
              {formik.touched.streetAddress && formik.errors.streetAddress && (
                <p className="mt-1 text-xs text-red-600">{String(formik.errors.streetAddress)}</p>
              )}
            </div>

            {/* Address type — segmented control */}
            <div>
              <span className="mb-2 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Address type
              </span>
              <div className="flex gap-3">
                {(["home", "office"] as const).map((type) => (
                  <label
                    key={type}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors select-none ${
                      formik.values.addressType === type
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="addressType"
                      value={type}
                      checked={formik.values.addressType === type}
                      onChange={() => formik.setFieldValue("addressType", type)}
                      onBlur={formik.handleBlur}
                      className="sr-only"
                    />
                    {type === "home" ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                      </svg>
                    )}
                    {type === "home" ? "Home" : "Office"}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full min-h-[48px] cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                style={{ background: "var(--color-primary)" }}
              >
                {formik.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving…
                  </span>
                ) : (
                  "Save address"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
