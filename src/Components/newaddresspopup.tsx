import { useEffect } from "react";
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

const inputBase =
  "w-full min-h-[44px] rounded-xl border bg-transparent px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
const inputError = "border-red-500 focus:ring-red-400";
const inputNormal = "border-[var(--color-border)] focus:ring-[var(--color-primary)]";

export default function NewAddressPopUp({ closePopup }: { closePopup: () => void }) {
  const user = useAppSelector((state: any) => state.user);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobileNumber: user?.phone ?? "",
      pincode: "",
      state: "",
      city: "",
      streetAddress: "",
      addressType: "home" as "home" | "office",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
      mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid Indian mobile number")
        .length(10, "Must be 10 digits"),
      pincode: Yup.string().required("Pincode is required").matches(/^\d{6}$/, "Invalid pincode"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      streetAddress: Yup.string()
        .required("Street address is required")
        .min(3, "Address must be at least 3 characters"),
      addressType: Yup.string().required("Address type is required").oneOf(["home", "office"], "Invalid address type"),
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
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closePopup]);

  return (
    <div className="fixed inset-0 z-[123] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-address-title">
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={closePopup}
      />
      <div
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-xl"
        style={{ borderColor: "var(--color-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "var(--color-border)" }}>
          <h2 id="add-address-title" className="text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
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
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className={`${inputBase} ${formik.touched.name && formik.errors.name ? inputError : inputNormal}`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.name)}</p>
                )}
              </div>
              <div>
                <label htmlFor="mobileNumber" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Mobile number
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  placeholder="10-digit mobile number"
                  className={`${inputBase} ${formik.touched.mobileNumber && formik.errors.mobileNumber ? inputError : inputNormal}`}
                  {...formik.getFieldProps("mobileNumber")}
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.mobileNumber)}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pincode" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Pincode
                </label>
                <input
                  id="pincode"
                  type="text"
                  placeholder="6-digit pincode"
                  className={`${inputBase} ${formik.touched.pincode && formik.errors.pincode ? inputError : inputNormal}`}
                  {...formik.getFieldProps("pincode")}
                />
                {formik.touched.pincode && formik.errors.pincode && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.pincode)}</p>
                )}
              </div>
              <div>
                <label htmlFor="state" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  State
                </label>
                <select
                  id="state"
                  className={`${inputBase} ${formik.touched.state && formik.errors.state ? inputError : inputNormal}`}
                  {...formik.getFieldProps("state")}
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {formik.touched.state && formik.errors.state && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.state)}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="City"
                className={`${inputBase} ${formik.touched.city && formik.errors.city ? inputError : inputNormal}`}
                {...formik.getFieldProps("city")}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-xs text-red-600">{String(formik.errors.city)}</p>
              )}
            </div>

            <div>
              <label htmlFor="streetAddress" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Street address
              </label>
              <input
                id="streetAddress"
                type="text"
                placeholder="House no., building, area"
                className={`${inputBase} ${formik.touched.streetAddress && formik.errors.streetAddress ? inputError : inputNormal}`}
                {...formik.getFieldProps("streetAddress")}
              />
{formik.touched.streetAddress && formik.errors.streetAddress && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.streetAddress)}</p>
                )}
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Address type
              </span>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={formik.values.addressType === "home"}
                    onChange={() => formik.setFieldValue("addressType", "home")}
                    onBlur={formik.handleBlur}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>
                    Home
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="addressType"
                    value="office"
                    checked={formik.values.addressType === "office"}
                    onChange={() => formik.setFieldValue("addressType", "office")}
                    onBlur={formik.handleBlur}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>
                    Office
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full min-h-[48px] cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                style={{ background: "var(--color-primary)" }}
              >
                {formik.isSubmitting ? "Saving…" : "Save address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
