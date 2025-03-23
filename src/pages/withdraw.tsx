import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getData, postData } from "../services/apiServices";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function Withdraw() {
    const [toggleState, setToggleState] = useState(1);
    const user = useSelector((state: any) => state.user);
    const toggleTab = (index: SetStateAction<number>) => {
        setToggleState(index);
    }
    const [showAddBank, setShowAddBank] = useState(false);
    const [bankDetails, setBankDetails] = useState([]);
    const [userDefaultBank, setUserDefaultBank] = useState<any>({});
    const [recentOrdersdata, setRecentOrdersdata] = useState<any>({});
    const [withdrawalHistory, setWithdrawalHistory] = useState<any>([]);
    const [removingBankId, setRemovingBankId] = useState<string>('');
    const [validationStates, setValidationStates] = useState({
        isAmountValid: false,
        isBankSelected: false,
        isBalanceSufficient: false,
        isTotalAmountValid: false
    });

    const formik = useFormik({
        initialValues: {
            accountHolderName: '',
            accountNumber: '',
            ifscCode: '',
            bankName: '',
            branchName: '',
            accountType: 'savings',
            userId: user?.id
        },
        validationSchema: Yup.object().shape({
            accountHolderName: Yup.string().required('Account holder name is required'),
            accountNumber: Yup.string()
                .required('Account number is required')
                .matches(/^\d+$/, 'Must be only digits')
                .length(12, 'Must be 12 digits'),
            ifscCode: Yup.string()
                .required('IFSC code is required')
                .matches(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, 'Invalid IFSC format'),
            bankName: Yup.string().required('Bank name is required'),
            branchName: Yup.string(),
            accountType: Yup.string()
                .required('Account type is required')
                .oneOf(['savings', 'current'], 'Invalid account type')
        }),
        onSubmit: async (values) => {
            console.log('Form values:', values);
            // Add your form submission logic here      
            await postData('/add-bank-detail', values).then((res) => {
                    toast.success(res.data.message);
                    console.log(res);
                    setShowAddBank(false);
                    formik.resetForm();
            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
            })
        }
    });

    const withdrawFormik = useFormik({
        initialValues: {
            amount: ''
        },
        validationSchema: Yup.object().shape({
            amount: Yup.number()
                .required('Amount is required')
                .positive('Amount must be positive')
                .min(1, 'Minimum withdrawal amount is ₹1')
        }),
        onSubmit: async (values) => {
            console.log('Withdrawal values:', values);
            // Add your withdrawal submission logic here
            const data = {
                amount: values?.amount,
                bankDetail: userDefaultBank?._id,
                userId: user?.id
            }
            await postData('/create-withdrawal', data).then((res) => {
                toast.success(res.data.message);
                withdrawFormik.resetForm();
            }).catch((err) => {
                toast.error(err.response.data.message);
            })
        }
    });

    const getBankDetails = async () => {
        await getData('/get-bank-details').then((res: any) => {
            console.log(res);
            setBankDetails(res?.data?.bankDetails);
            const defaultBank = res?.data?.bankDetails?.find((item: any) => item?.isDefault === true);
            setUserDefaultBank(defaultBank);

        }).catch((err: any) => {
            console.log(err);
        })
    }
    const setDefaultBank = async (id: string) => {
        await postData(`set-default-bank/${id}`,{}).then((res: any) => {
            console.log(res);
            toast.success(res?.data?.message);

            getBankDetails();
        }).catch((err: any) => {
            console.log(err);
        })
    }
    const removeBank = async (id: string) => {
        setRemovingBankId(id);
        await postData(`/delete-bank-detail`,{id:id}).then((res: any) => {
            console.log(res);
            toast.success(res?.data?.message);
            setRemovingBankId('');
            getBankDetails();
        }).catch((err: any) => {
            console.log(err);
            setRemovingBankId('');
        })
    }

    const getWithdrawalHistory = async () => {
        await getData('/user-withdrawals').then((res: any) => {
            console.log(res);
            setWithdrawalHistory(res?.data?.withdrawals);   
        }).catch((err: any) => {
            console.log(err);
        })
    }
    
        const recentOrders = async () => {
        const userId:string = user?.id;
        console.log("user",userId , user);
        await getData(`/get-user-recent-orders/${userId}`).then((res: any) => {
            console.log("recent orders",res);
            setRecentOrdersdata(res?.data);
        }).catch((err: any) => {
            console.log("error in recent orders",err);
        })
    }   
    useEffect(() => {
        getBankDetails();
        recentOrders();
        getWithdrawalHistory();
    }, []);

    useEffect(() => {
        const amountValid = Number(withdrawFormik.values.amount) >= 100;
        const bankSelected = !!userDefaultBank?._id;
        const balanceSufficient = Number(Number(withdrawFormik.values.amount) >= 100 ? withdrawFormik.values.amount : 100) <= user?.balance;
        const totalAmountValid = Number(recentOrdersdata?.totalAmount) >= 300;
        
        setValidationStates({
            isAmountValid: amountValid,
            isBankSelected: bankSelected,
            isBalanceSufficient: balanceSufficient,
            isTotalAmountValid: totalAmountValid
        });
    }, [withdrawFormik.values.amount, userDefaultBank, user, recentOrdersdata?.totalAmount]);

    return (
        <>
            <section className="withdraw">
                <div className="container">
                    <h1 className="attriheading">Withdraw</h1>
                    <div className="withdraw-main padding-tb">
                        <div className="custom-tab d-flex justify-center">
                            <div className={toggleState === 1 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(1)}>Withdraw</div>
                            <div className={toggleState === 2 ? "tabs hovertime active" : "tabs hovertime"} onClick={() => toggleTab(2)}>History</div>
                        </div>
                        <div className="latest-content">
                            <div className={toggleState === 1 ? "content-tab active" : "content-tab"}>
                                <div className="withdraw-sec d-flex">
                                    <div className="withdraw-card withdraw-left">
                                        <div className="withdraw-card-top d-flex">
                                            <h2 className="attrixsheading">Saved Bank</h2>
                                            <button type="button" className="bank-btn align d-flex" onClick={() => setShowAddBank(true)}>
                                                <svg className="plus-icon" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 1.5V15.5M1 8.5H15" stroke="#D03438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                Add Bank
                                            </button>    
                                        </div>
                                        {/* {`address-item ${addr;ess?.isDefault === true ? 'active' : ''} relative`} */}
                                        <div className="bank-list d-grid">
                                            {bankDetails?.map((item: any) => (
                                            <div className={`bank-item ${item?.isDefault === true ? 'active' : ''} relative`} key={item?._id}>
                                                {/* checked={address?.isDefault === true} onChange={()=>defaultAddress(address?._id)} */}
                                                <input className="radio-input" type="radio" id="html" name="fav_language" value="HTML" checked={item?.isDefault === true} onChange={()=>setDefaultBank(item?._id)}></input>
                                                <label htmlFor="html">
                                                <div className="bank-details">
                                                    <p className="bank-number">Account Number: <span>{item?.accountNumber}</span></p>
                                                    <p className="bank-number">Bank Name: <span>{item?.bankName}</span></p>
                                                    <p className="bank-number">Ifsc : <span>{item?.ifscCode}</span></p>
                                                    <p className="bank-number">Account Holder : <span>{item?.accountHolderName}</span></p>
                                                </div>
                                                <div className="bank-bottom">
                                                    <button type="button" className="bank-btn align d-flex" onClick={()=>removeBank(item?._id)}>
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6667 2.66666C14.8877 2.66666 15.0996 2.75445 15.2559 2.91073C15.4122 3.06701 15.5 3.27898 15.5 3.49999C15.5 3.721 15.4122 3.93296 15.2559 4.08925C15.0996 4.24553 14.8877 4.33332 14.6667 4.33332H13.8333L13.8308 4.39249L13.0533 15.285C13.0234 15.7055 12.8352 16.099 12.5268 16.3863C12.2183 16.6736 11.8124 16.8333 11.3908 16.8333H4.60833C4.18678 16.8333 3.78089 16.6736 3.4724 16.3863C3.16392 16.099 2.97576 15.7055 2.94583 15.285L2.16833 4.39332C2.16707 4.37335 2.16651 4.35334 2.16667 4.33332H1.33333C1.11232 4.33332 0.900358 4.24553 0.744078 4.08925C0.587797 3.93296 0.5 3.721 0.5 3.49999C0.5 3.27898 0.587797 3.06701 0.744078 2.91073C0.900358 2.75445 1.11232 2.66666 1.33333 2.66666H14.6667ZM12.1642 4.33332H3.83583L4.60917 15.1667H11.3908L12.1642 4.33332ZM9.66667 0.166656C9.88768 0.166656 10.0996 0.254454 10.2559 0.410734C10.4122 0.567014 10.5 0.778976 10.5 0.99999C10.5 1.221 10.4122 1.43297 10.2559 1.58925C10.0996 1.74553 9.88768 1.83332 9.66667 1.83332H6.33333C6.11232 1.83332 5.90036 1.74553 5.74408 1.58925C5.5878 1.43297 5.5 1.221 5.5 0.99999C5.5 0.778976 5.5878 0.567014 5.74408 0.410734C5.90036 0.254454 6.11232 0.166656 6.33333 0.166656H9.66667Z" fill="#D03438" />
                                                        </svg>
                                                        {removingBankId === item._id ? 'REMOVING...' : 'REMOVE'}
                                                    </button>
                                                </div>
                                                </label>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="withdraw-card withdraw-right">
                                        
                                        <form onSubmit={withdrawFormik.handleSubmit}>
                                            <div className="form-group">
                                                <input 
                                                    className={`form-control ${withdrawFormik.touched.amount && withdrawFormik.errors.amount ? 'error' : ''}`}
                                                    placeholder="Withdraw Amount" 
                                                    type="number"  
                                                    name="amount"
                                                    value={withdrawFormik.values.amount}
                                                    onChange={withdrawFormik.handleChange}
                                                    onBlur={withdrawFormik.handleBlur}
                                                />
                                                {withdrawFormik.touched.amount && withdrawFormik.errors.amount && (
                                                    <div className="error-message">{withdrawFormik.errors.amount}</div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <button 
                                                    type="submit" 
                                                    className="w-full anchor-button hovertime"
                                                    disabled={withdrawFormik.isSubmitting || !withdrawFormik.isValid || !validationStates.isAmountValid || !validationStates.isBankSelected || !validationStates.isBalanceSufficient || !validationStates.isTotalAmountValid}
                                                >
                                                    {withdrawFormik.isSubmitting ? 'Processing...' : 'Submit'}
                                                </button>
                                            </div>
                                            <div className="validation-list mb-6">
                                                <div className={`validation-item ${validationStates.isAmountValid ? 'valid' : 'invalid'} flex items-center mb-3`}>
                                                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                                                         stroke={validationStates.isAmountValid ? "#10B981" : "#EF4444"} strokeWidth="2">
                                                        {validationStates.isAmountValid ? 
                                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/> :
                                                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>}
                                                    </svg>
                                                    <span className={`text-sm ${validationStates.isAmountValid ? 'text-green-500' : 'text-red-500'}`}>
                                                        Minimum withdrawal amount ₹100
                                                    </span>
                                                </div>
                                                <div className={`validation-item ${validationStates.isBankSelected ? 'valid' : 'invalid'} flex items-center mb-3`}>
                                                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                                                         stroke={validationStates.isBankSelected ? "#10B981" : "#EF4444"} strokeWidth="2">
                                                        {validationStates.isBankSelected ? 
                                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/> :
                                                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>}
                                                    </svg>
                                                    <span className={`text-sm ${validationStates.isBankSelected ? 'text-green-500' : 'text-red-500'}`}>
                                                        Bank account selected
                                                    </span>
                                                </div>
                                                <div className={`validation-item ${validationStates.isBalanceSufficient ? 'valid' : 'invalid'} flex items-center mb-3`}>
                                                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                                                         stroke={validationStates.isBalanceSufficient ? "#10B981" : "#EF4444"} strokeWidth="2">
                                                        {validationStates.isBalanceSufficient ? 
                                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/> :
                                                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>}
                                                    </svg>
                                                    <span className={`text-sm ${validationStates.isBalanceSufficient ? 'text-green-500' : 'text-red-500'}`}>
                                                        Sufficient balance available
                                                    </span>
                                                </div>
                                                <div className={`validation-item ${validationStates.isTotalAmountValid ? 'valid' : 'invalid'} flex items-center mb-3`}>
                                                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                                                         stroke={validationStates.isTotalAmountValid ? "#10B981" : "#EF4444"} strokeWidth="2">
                                                        {validationStates.isTotalAmountValid ? 
                                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/> :
                                                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>}
                                                    </svg>
                                                    <span className={`text-sm ${validationStates.isTotalAmountValid ? 'text-green-500' : 'text-red-500'}`}>
                                                        Minimum total orders amount should be ₹300 in last 30 days
                                                    </span>
                                                </div>
                                            </div>
                                           
                                        </form>
                                    </div>
                                </div>
                                <div className="terms">
                                    <h4 className="attrimdheading">Terms & Condition</h4>
                                    <p>The User hereby consents, expresses and agrees that he has read and fully understands the terms and conditions of the platform.</p>
                                    <ul>
                                        <li>📌 <strong>Minimum Withdrawal Amount</strong><br/>Withdrawals can only be processed for amounts of ₹100 or more. Any request below this amount will not be accepted.</li>
                                        <li>🏦 <strong>Bank Account Requirement</strong><br/>A valid bank account must be linked to proceed with a withdrawal. Ensure that the provided bank details are correct to avoid any transaction issues.</li>
                                        <li>💰 <strong>Sufficient Balance</strong><br/>The withdrawal request must not exceed the available balance. If the balance is insufficient, the request will be declined.</li>
                                        <li>🛒 <strong>Minimum Order Requirement</strong><br/>A total order value of at least ₹300 in the last 30 days is required to be eligible for withdrawal. If this condition is not met, the withdrawal request cannot be processed.</li>
                                        <li>💸 <strong>TDS Deduction</strong><br/>A 2% TDS (Tax Deducted at Source) will be deducted from the withdrawal amount as per tax regulations.</li>
                                        <li>⏳ <strong>Processing Time</strong><br/>The withdrawn amount will be credited to the linked bank account within 48 hours.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={toggleState === 2 ? "content-tab active" : "content-tab"}>
                            <div className="table-responsive withdraw-table ">
                                <table className="table table-bordered table_custom_wrap">
                                    <thead>
                                        <tr>
                                            <td>Ammount</td>
                                            <td>Status</td>
                                            <td>Date</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdrawalHistory?.map((item: any) => (
                                        <tr key={item?._id}>
                                            <td>₹{item?.amount}</td>
                                            <td>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    item?.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    item?.status.toLowerCase() === 'approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}
                                                </span>
                                            </td>
                                            <td>{new Date(item?.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

         {showAddBank &&   <div className="attri-popup newaddress-popup addbank-popup">
                <div className="attri-popup-overlay"></div>
                <div className="attri-popup-wrapper">
                    {/* onClick={closePopup} */}
                    <button className="attri-popup-close" onClick={() => setShowAddBank(false)}><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
                    <div className="attri-popup-body d-flex align">
                        <h1 className="attrimdheading">Add Bank Detail</h1>
                        <div className="attri-popup-form">
                        <form onSubmit={formik.handleSubmit}>
  <div className="form-row d-flex">
    <div className="form-group">
      <label className="form-label">Account Holder Name</label>
      <input
        type="text"
        className={`form-control ${formik.touched.accountHolderName && formik.errors.accountHolderName ? 'error' : ''}`}
        placeholder="Account Holder Name"
        {...formik.getFieldProps('accountHolderName')}
      />
      {formik.touched.accountHolderName && formik.errors.accountHolderName && (
        <div className="error-message">{formik.errors.accountHolderName}</div>
      )}
    </div>
    
    <div className="form-group">
      <label className="form-label">Bank Name</label>
      <input
        type="text"
        className={`form-control ${formik.touched.bankName && formik.errors.bankName ? 'error' : ''}`}
        placeholder="Bank Name"
        {...formik.getFieldProps('bankName')}
      />
      {formik.touched.bankName && formik.errors.bankName && (
        <div className="error-message">{formik.errors.bankName}</div>
      )}
    </div>

    <div className="form-group">
      <label className="form-label">IFSC Code</label>
      <input
        type="text"
        className={`form-control ${formik.touched.ifscCode && formik.errors.ifscCode ? 'error' : ''}`}
        placeholder="IFSC Code"
        {...formik.getFieldProps('ifscCode')}
      />
      {formik.touched.ifscCode && formik.errors.ifscCode && (
        <div className="error-message">{formik.errors.ifscCode}</div>
      )}
    </div>

    <div className="form-group">
      <label className="form-label">Account Number</label>
      <input
        type="text"
        className={`form-control ${formik.touched.accountNumber && formik.errors.accountNumber ? 'error' : ''}`}
        placeholder="Account Number"
        {...formik.getFieldProps('accountNumber')}
      />
      {formik.touched.accountNumber && formik.errors.accountNumber && (
        <div className="error-message">{formik.errors.accountNumber}</div>
      )}
    </div>

    <div className="form-group">
      <label className="form-label">Branch Name (Optional)</label>
      <input
        type="text"
        className="form-control"
        placeholder="Branch Name"
        {...formik.getFieldProps('branchName')}
      />
    </div>

    <div className="form-group">
      <label className="form-label">Account Type</label>
      <select
        className={`form-control ${formik.touched.accountType && formik.errors.accountType ? 'error' : ''}`}
        {...formik.getFieldProps('accountType')}
      >
        <option value="savings">Savings</option>
        <option value="current">Current</option>
      </select>
      {formik.touched.accountType && formik.errors.accountType && (
        <div className="error-message">{formik.errors.accountType}</div>
      )}
    </div>

    <div className="form-group">
      <button 
        type="submit" 
        className="w-full anchor-button hovertime"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </div>
  </div>
</form>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
  );
}