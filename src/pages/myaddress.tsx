import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/rootReduces";
import NewAddressPopUp from "@/Components/newaddresspopup";
import EditAddressPopUp from "@/Components/editaddresspopup";
import AccountSideBar from "@/Components/accountsidebar";
import SaveAddress from "@/Components/saveaddress";
import { getData, postData } from "@/services/apiServices";
import { useAppSelector } from "@/hooks/hooks";

function AddressCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border p-6"
      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex justify-between">
        <div className="h-5 w-32 rounded bg-gray-200" />
        <div className="h-6 w-16 rounded-full bg-gray-200" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
      </div>
      <div className="mt-6 flex gap-3 border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
        <div className="h-10 w-24 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

export default function MyAddress() {
  const router = useRouter();
  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
  const [addressData, setAddressData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state: any) => state.user);
  const cartCount = useSelector((state: RootState) => state?.cartCount?.count ?? 0);
  const cartItems = useSelector((state: RootState) => state.cart?.items ?? []);
  const hasCartItems = cartCount > 0 || cartItems.length > 0;

  useEffect(() => {
    getaddressData();
  }, [showAddAddressPopup]);

  const getaddressData = async () => {
    setIsLoading(true);
    await getData(`users/${user?.id}/addresses`)
      .then((res: any) => {
        setAddressData(res?.data?.addresses ?? []);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const makeDefaultAddress = async (addressId: string) => {
    await postData(`addresses/${addressId}/default`, { userId: user?.id })
      .then(() => {
        getaddressData();
        if (hasCartItems) router.push("/cart");
      })
      .catch((err: any) => console.log(err));
  };

  const deleteAddress = async (addressId: string) => {
    await postData(`delete-address`, { id: addressId })
      .then(() => getaddressData())
      .catch((err: any) => console.log(err));
  };

  return (
    <>
      <section className="account-box min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="container">
          <div className="account-main d-flex padding-tb">
            <div className="account-left hidden md:block" style={{ background: "transparent" }}>
              <AccountSideBar />
            </div>
            <div className="account-right flex flex-col gap-8">
              {/* Header */}
              <header
                className="relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-10"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 60%)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <h1 className="font-bold text-2xl tracking-tight md:text-3xl" style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-heading)" }}>
                  My Address
                </h1>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  Manage your delivery addresses
                </p>
              </header>

              {/* Section: Saved addresses + Add button */}
              <section aria-label="Saved addresses">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold" style={{ color: "var(--color-charcoal)" }}>
                    Saved addresses
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressPopup(true)}
                    className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                    style={{ background: "var(--color-primary)" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 16 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 1.5v14M1 8.5h14" />
                    </svg>
                    Add new address
                  </button>
                </div>

                {isLoading ? (
                  <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((i) => (
                      <AddressCardSkeleton key={i} />
                    ))}
                  </div>
                ) : addressData?.length > 0 ? (
                  <ul className="mt-6 space-y-4" aria-label="Address list">
                    {addressData.map((item: any) => (
                      <li key={item?.id ?? item?._id}>
                        <SaveAddress
                          address={item}
                          defaultAddress={makeDefaultAddress}
                          deleteAddress={deleteAddress}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    className="mt-6 flex flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center"
                    style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "var(--color-primary-light)" }}>
                      <svg className="h-12 w-12" style={{ color: "var(--color-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold md:text-2xl" style={{ color: "var(--color-charcoal)" }}>
                      No addresses yet
                    </h2>
                    <p className="mt-2 max-w-sm text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      You haven’t added any delivery addresses yet. Add one to get started.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAddAddressPopup(true)}
                      className="mt-6 inline-flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                      style={{ background: "var(--color-primary)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 16 17" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 1.5v14M1 8.5h14" />
                      </svg>
                      Add your first address
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>

      {showAddAddressPopup && <NewAddressPopUp closePopup={() => setShowAddAddressPopup(false)} />}
      <EditAddressPopUp />
    </>
  );
}
