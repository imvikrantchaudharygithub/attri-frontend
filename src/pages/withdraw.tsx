import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getData, postData } from "@/services/apiServices";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/hooks";
import AccountSideBar from "@/Components/accountsidebar";

const inputBase =
  "w-full min-h-[44px] rounded-xl border bg-transparent px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
const inputError = "border-red-500 focus:ring-red-400";
const inputNormal = "border-[var(--color-border)] focus:ring-[var(--color-primary)]";

export default function Withdraw() {
  const [toggleState, setToggleState] = useState(1);
  const user = useSelector((state: any) => state.user);
  const token = useAppSelector((state: any) => state.token.token);
  const router = useRouter();
  const [showAddBank, setShowAddBank] = useState(false);
  const [bankDetails, setBankDetails] = useState<any[]>([]);
  const [userDefaultBank, setUserDefaultBank] = useState<any>({});
  const [recentOrdersdata, setRecentOrdersdata] = useState<any>({});
  const [withdrawalHistory, setWithdrawalHistory] = useState<any[]>([]);
  const [removingBankId, setRemovingBankId] = useState<string>("");
  const [validationStates, setValidationStates] = useState({
    isAmountValid: false,
    isBankSelected: false,
    isBalanceSufficient: false,
    isTotalAmountValid: false,
  });

  useEffect(() => {
    if (!token) router.push("/");
  }, [token, router]);

  const formik = useFormik({
    initialValues: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: "",
      accountType: "savings",
      userId: user?.id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      accountHolderName: Yup.string().required("Account holder name is required"),
      accountNumber: Yup.string()
        .required("Account number is required")
        .matches(/^\d+$/, "Must be only digits")
        .min(9, "Must be between 9-18 digits")
        .max(18, "Must be between 9-18 digits"),
      ifscCode: Yup.string()
        .required("IFSC code is required")
        .matches(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, "Invalid IFSC format"),
      bankName: Yup.string().required("Bank name is required"),
      branchName: Yup.string(),
      accountType: Yup.string()
        .required("Account type is required")
        .oneOf(["savings", "current"], "Invalid account type"),
    }),
    onSubmit: async (values) => {
      await postData("/add-bank-detail", values)
        .then((res: any) => {
          toast.success(res?.data?.message ?? "Bank added successfully");
          setShowAddBank(false);
          formik.resetForm();
          getBankDetails();
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message ?? "Something went wrong");
        });
    },
  });

  const withdrawFormik = useFormik({
    initialValues: { amount: "" },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be positive")
        .min(1, "Minimum withdrawal amount is ₹1"),
    }),
    onSubmit: async (values) => {
      const data = {
        amount: values?.amount,
        bankDetail: userDefaultBank?._id,
        userId: user?.id,
      };
      await postData("/create-withdrawal", data)
        .then((res: any) => {
          toast.success(res?.data?.message ?? "Withdrawal requested");
          withdrawFormik.resetForm();
          getWithdrawalHistory();
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message ?? "Withdrawal failed");
        });
    },
  });

  const getBankDetails = async () => {
    await getData("/get-bank-details")
      .then((res: any) => {
        setBankDetails(res?.data?.bankDetails ?? []);
        const defaultBank = (res?.data?.bankDetails ?? []).find((item: any) => item?.isDefault === true);
        setUserDefaultBank(defaultBank ?? {});
      })
      .catch((err: any) => console.log(err));
  };

  const setDefaultBank = async (id: string) => {
    await postData(`set-default-bank/${id}`, {})
      .then((res: any) => {
        toast.success(res?.data?.message ?? "Default bank updated");
        getBankDetails();
      })
      .catch((err: any) => console.log(err));
  };

  const removeBank = async (id: string) => {
    setRemovingBankId(id);
    await postData("/delete-bank-detail", { id })
      .then((res: any) => {
        toast.success(res?.data?.message ?? "Bank removed");
        setRemovingBankId("");
        getBankDetails();
      })
      .catch((err: any) => {
        setRemovingBankId("");
      });
  };

  const getWithdrawalHistory = async () => {
    await getData("/user-withdrawals")
      .then((res: any) => setWithdrawalHistory(res?.data?.withdrawals ?? []))
      .catch((err: any) => console.log(err));
  };

  const recentOrders = async () => {
    await getData(`/get-user-recent-orders/${user?.id}`)
      .then((res: any) => setRecentOrdersdata(res?.data ?? {}))
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getBankDetails();
    recentOrders();
    getWithdrawalHistory();
  }, []);

  useEffect(() => {
    const amountValid = Number(withdrawFormik.values.amount) >= 100;
    const bankSelected = !!userDefaultBank?._id;
    const balanceSufficient =
      Number(Number(withdrawFormik.values.amount) >= 100 ? withdrawFormik.values.amount : 100) <= (user?.balance ?? 0);
    const totalAmountValid = Number(recentOrdersdata?.totalAmount) >= 300;
    setValidationStates({
      isAmountValid: amountValid,
      isBankSelected: bankSelected,
      isBalanceSufficient: balanceSufficient,
      isTotalAmountValid: totalAmountValid,
    });
  }, [withdrawFormik.values.amount, userDefaultBank, user?.balance, recentOrdersdata?.totalAmount]);

  const canSubmit =
    !withdrawFormik.isSubmitting &&
    withdrawFormik.isValid &&
    validationStates.isAmountValid &&
    validationStates.isBankSelected &&
    validationStates.isBalanceSufficient &&
    validationStates.isTotalAmountValid;

  return (
    <>
      <section className="account-box min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <div className="account-main d-flex padding-tb">
            <div className="account-left hidden md:block" style={{ background: "transparent" }}>
              <AccountSideBar />
            </div>
            <div className="account-right flex flex-col gap-8">
              {/* Hero */}
              <header
                className="relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 60%)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <h1 className="font-bold text-2xl tracking-tight md:text-3xl" style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-heading)" }}>
                  Withdraw
                </h1>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  Withdraw your balance to your bank account
                </p>
              </header>

              {/* Tabs */}
              <div className="flex gap-1 rounded-xl border p-1" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
                <button
                  type="button"
                  onClick={() => setToggleState(1)}
                  className={`min-h-[44px] flex-1 rounded-lg px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${
                    toggleState === 1 ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-charcoal)] hover:bg-[var(--color-bg)]"
                  }`}
                >
                  Withdraw
                </button>
                <button
                  type="button"
                  onClick={() => setToggleState(2)}
                  className={`min-h-[44px] flex-1 rounded-lg px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${
                    toggleState === 2 ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-charcoal)] hover:bg-[var(--color-bg)]"
                  }`}
                >
                  History
                </button>
              </div>

              {/* Tab 1: Withdraw */}
              {toggleState === 1 && (
                <div className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Saved bank */}
                    <div
                      className="rounded-2xl border p-6"
                      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
                        <h2 className="text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                          Saved bank
                        </h2>
                        <button
                          type="button"
                          onClick={() => setShowAddBank(true)}
                          className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                          style={{ background: "var(--color-primary)" }}
                        >
                          <svg width="18" height="18" viewBox="0 0 16 17" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 1.5v14M1 8.5h14" />
                          </svg>
                          Add bank
                        </button>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto space-y-4 mt-4">
                        {bankDetails?.length === 0 ? (
                          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 px-4" style={{ borderColor: "var(--color-border)" }}>
                            <svg className="h-12 w-12 mb-3" style={{ color: "var(--color-text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 3v2m10-2v2M6 2h12a1 1 0 011 1v18a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zm6 15a3 3 0 01-6 0" />
                            </svg>
                            <p className="text-sm font-medium text-center mb-4" style={{ color: "var(--color-text-secondary)" }}>
                              No bank accounts added. Add one to withdraw.
                            </p>
                            <button
                              type="button"
                              onClick={() => setShowAddBank(true)}
                              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                              style={{ background: "var(--color-primary)" }}
                            >
                              Add bank account
                            </button>
                          </div>
                        ) : (
                          bankDetails?.map((item: any) => (
                            <article
                              key={item?._id}
                              className={`rounded-xl border p-4 transition-colors ${
                                item?.isDefault ? "ring-2 ring-[var(--color-primary)]" : ""
                              }`}
                              style={{
                                borderColor: item?.isDefault ? "var(--color-primary)" : "var(--color-border)",
                                background: "var(--color-surface)",
                              }}
                            >
                              <label className="flex cursor-pointer items-start gap-3">
                                <input
                                  type="radio"
                                  name="defaultBank"
                                  checked={item?.isDefault === true}
                                  onChange={() => setDefaultBank(item?._id)}
                                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-primary)]"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                                    Account: <span className="font-semibold" style={{ color: "var(--color-charcoal)" }}>****{String(item?.accountNumber).slice(-4)}</span>
                                  </p>
                                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                                    {item?.bankName} · {item?.accountHolderName}
                                  </p>
                                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                                    IFSC: {item?.ifscCode}
                                  </p>
                                </div>
                              </label>
                              <div className="mt-3 flex border-t pt-3" style={{ borderColor: "var(--color-border)" }}>
                                <button
                                  type="button"
                                  onClick={() => removeBank(item?._id)}
                                  disabled={removingBankId === item?._id}
                                  className="inline-flex min-h-[40px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                                >
                                  {removingBankId === item?._id ? (
                                    <>
                                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                      </svg>
                                      Removing…
                                    </>
                                  ) : (
                                    "Remove"
                                  )}
                                </button>
                              </div>
                            </article>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Withdraw form */}
                    <div
                      className="rounded-2xl border p-6"
                      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
                    >
                      <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--color-charcoal)" }}>
                        Withdraw amount
                      </h2>
                      <form onSubmit={withdrawFormik.handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="withdraw-amount" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                            Amount (₹)
                          </label>
                          <input
                            id="withdraw-amount"
                            type="number"
                            placeholder="Min ₹100"
                            className={`${inputBase} ${withdrawFormik.touched.amount && withdrawFormik.errors.amount ? inputError : inputNormal}`}
                            name="amount"
                            value={withdrawFormik.values.amount}
                            onChange={withdrawFormik.handleChange}
                            onBlur={withdrawFormik.handleBlur}
                          />
                          {withdrawFormik.touched.amount && withdrawFormik.errors.amount && (
                            <p className="mt-1 text-xs text-red-600">{String(withdrawFormik.errors.amount)}</p>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={!canSubmit}
                          className="w-full min-h-[48px] cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                          style={{ background: "var(--color-primary)" }}
                        >
                          {withdrawFormik.isSubmitting ? "Processing…" : "Submit"}
                        </button>
                        <ul className="space-y-2 pt-2" aria-label="Withdrawal requirements">
                          {[
                            { valid: validationStates.isAmountValid, text: "Minimum withdrawal amount ₹100" },
                            { valid: validationStates.isBankSelected, text: "Bank account selected" },
                            { valid: validationStates.isBalanceSufficient, text: "Sufficient balance available" },
                            { valid: validationStates.isTotalAmountValid, text: "Minimum total orders ₹300 in last 30 days" },
                          ].map(({ valid, text }) => (
                            <li key={text} className="flex items-center gap-2 text-sm">
                              {valid ? (
                                <svg className="h-5 w-5 shrink-0 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                              <span style={{ color: valid ? "var(--color-success)" : "var(--color-error)" }}>{text}</span>
                            </li>
                          ))}
                        </ul>
                      </form>
                    </div>
                  </div>

                  {/* Terms */}
                  <div
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
                  >
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-charcoal)" }}>
                      Terms & Condition
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                      The User hereby consents, expresses and agrees that he has read and fully understands the terms and conditions of the platform.
                    </p>
                    <ul className="space-y-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <li><strong style={{ color: "var(--color-charcoal)" }}>📌 Minimum Withdrawal Amount</strong><br />Withdrawals can only be processed for amounts of ₹100 or more. Any request below this amount will not be accepted.</li>
                      <li><strong style={{ color: "var(--color-charcoal)" }}>🏦 Bank Account Requirement</strong><br />A valid bank account must be linked to proceed with a withdrawal. Ensure that the provided bank details are correct to avoid any transaction issues.</li>
                      <li><strong style={{ color: "var(--color-charcoal)" }}>💰 Sufficient Balance</strong><br />The withdrawal request must not exceed the available balance. If the balance is insufficient, the request will be declined.</li>
                      <li><strong style={{ color: "var(--color-charcoal)" }}>🛒 Minimum Order Requirement</strong><br />A total order value of at least ₹300 in the last 30 days is required to be eligible for withdrawal. If this condition is not met, the withdrawal request cannot be processed.</li>
                      <li><strong style={{ color: "var(--color-charcoal)" }}>💸 TDS Deduction</strong><br />A 2% TDS (Tax Deducted at Source) will be deducted from the withdrawal amount as per tax regulations.</li>
                      <li><strong style={{ color: "var(--color-charcoal)" }}>⏳ Processing Time</strong><br />The withdrawn amount will be credited to the linked bank account within 48 hours.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: History */}
              {toggleState === 2 && (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr style={{ background: "var(--color-bg)" }}>
                          <th className="px-4 py-3 font-semibold" style={{ color: "var(--color-charcoal)" }}>Amount</th>
                          <th className="px-4 py-3 font-semibold" style={{ color: "var(--color-charcoal)" }}>Status</th>
                          <th className="px-4 py-3 font-semibold" style={{ color: "var(--color-charcoal)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawalHistory?.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="px-4 py-8 text-center" style={{ color: "var(--color-text-muted)" }}>
                              No withdrawals yet
                            </td>
                          </tr>
                        ) : (
                          withdrawalHistory?.map((item: any) => (
                            <tr key={item?._id} className="border-t" style={{ borderColor: "var(--color-border)" }}>
                              <td className="px-4 py-3 font-medium" style={{ color: "var(--color-charcoal)" }}>₹{item?.amount}</td>
                              <td className="px-4 py-3">
                                <span
                                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                                  style={{
                                    background:
                                      (item?.status ?? "").toLowerCase() === "approved"
                                        ? "rgba(22, 163, 74, 0.12)"
                                        : (item?.status ?? "").toLowerCase() === "pending"
                                        ? "rgba(245, 158, 11, 0.12)"
                                        : "rgba(220, 38, 38, 0.12)",
                                    color:
                                      (item?.status ?? "").toLowerCase() === "approved"
                                        ? "var(--color-success)"
                                        : (item?.status ?? "").toLowerCase() === "pending"
                                        ? "var(--color-warning)"
                                        : "var(--color-error)",
                                  }}
                                >
                                  {(item?.status ?? "").charAt(0).toUpperCase() + (item?.status ?? "").slice(1).toLowerCase()}
                                </span>
                              </td>
                              <td className="px-4 py-3" style={{ color: "var(--color-text-secondary)" }}>
                                {item?.createdAt
                                  ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
                                  : "—"}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Add Bank popup */}
      {showAddBank && (
        <AddBankPopup
          formik={formik}
          onClose={() => setShowAddBank(false)}
          inputBase={inputBase}
          inputError={inputError}
          inputNormal={inputNormal}
        />
      )}
    </>
  );
}

function AddBankPopup({
  formik,
  onClose,
  inputBase,
  inputError,
  inputNormal,
}: {
  formik: ReturnType<typeof useFormik<any>>;
  onClose: () => void;
  inputBase: string;
  inputError: string;
  inputNormal: string;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[123] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-bank-title">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={onClose} />
      <div
        className="relative w-full max-w-[520px] max-h-[90vh] overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-xl"
        style={{ borderColor: "var(--color-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "var(--color-border)" }}>
          <h2 id="add-bank-title" className="text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
            Add bank details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5" style={{ maxHeight: "calc(90vh - 72px)" }}>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="accountHolderName" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Account holder name
              </label>
              <input
                id="accountHolderName"
                type="text"
                placeholder="Account holder name"
                className={`${inputBase} ${formik.touched.accountHolderName && formik.errors.accountHolderName ? inputError : inputNormal}`}
                {...formik.getFieldProps("accountHolderName")}
              />
              {formik.touched.accountHolderName && formik.errors.accountHolderName && (
                <p className="mt-1 text-xs text-red-600">{String(formik.errors.accountHolderName)}</p>
              )}
            </div>
            <div>
              <label htmlFor="bankName" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Bank name
              </label>
              <input
                id="bankName"
                type="text"
                placeholder="Bank name"
                className={`${inputBase} ${formik.touched.bankName && formik.errors.bankName ? inputError : inputNormal}`}
                {...formik.getFieldProps("bankName")}
              />
              {formik.touched.bankName && formik.errors.bankName && (
                <p className="mt-1 text-xs text-red-600">{String(formik.errors.bankName)}</p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ifscCode" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  IFSC code
                </label>
                <input
                  id="ifscCode"
                  type="text"
                  placeholder="e.g. SBIN0001234"
                  className={`${inputBase} ${formik.touched.ifscCode && formik.errors.ifscCode ? inputError : inputNormal}`}
                  {...formik.getFieldProps("ifscCode")}
                />
                {formik.touched.ifscCode && formik.errors.ifscCode && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.ifscCode)}</p>
                )}
              </div>
              <div>
                <label htmlFor="accountNumber" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  Account number
                </label>
                <input
                  id="accountNumber"
                  type="text"
                  placeholder="9–18 digits"
                  className={`${inputBase} ${formik.touched.accountNumber && formik.errors.accountNumber ? inputError : inputNormal}`}
                  {...formik.getFieldProps("accountNumber")}
                />
                {formik.touched.accountNumber && formik.errors.accountNumber && (
                  <p className="mt-1 text-xs text-red-600">{String(formik.errors.accountNumber)}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="branchName" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Branch name (optional)
              </label>
              <input id="branchName" type="text" placeholder="Branch name" className={inputBase + " " + inputNormal} {...formik.getFieldProps("branchName")} />
            </div>
            <div>
              <label htmlFor="accountType" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                Account type
              </label>
              <select
                id="accountType"
                className={`${inputBase} ${formik.touched.accountType && formik.errors.accountType ? inputError : inputNormal}`}
                {...formik.getFieldProps("accountType")}
              >
                <option value="savings">Savings</option>
                <option value="current">Current</option>
              </select>
              {formik.touched.accountType && formik.errors.accountType && (
                <p className="mt-1 text-xs text-red-600">{String(formik.errors.accountType)}</p>
              )}
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full min-h-[48px] cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                style={{ background: "var(--color-primary)" }}
              >
                {formik.isSubmitting ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
