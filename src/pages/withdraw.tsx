import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";


export default function Withdraw() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index: SetStateAction<number>) => {
        setToggleState(index);
    }
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
                                            <button type="button" className="bank-btn align d-flex">
                                                <svg className="plus-icon" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 1.5V15.5M1 8.5H15" stroke="#D03438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                Add Bank
                                            </button>    
                                        </div>
                                        {/* {`address-item ${addr;ess?.isDefault === true ? 'active' : ''} relative`} */}
                                        <div className="bank-list d-grid">
                                            <div className="bank-item">
                                                {/* checked={address?.isDefault === true} onChange={()=>defaultAddress(address?._id)} */}
                                                <input className="radio-input" type="radio" id="html" name="fav_language" value="HTML" ></input>
                                                <label htmlFor="html">
                                                <div className="bank-details">
                                                    <p className="bank-number">Account Number: <span>Icic bank</span></p>
                                                    <p className="bank-number">Bank Name: <span>Icic bank</span></p>
                                                    <p className="bank-number">Ifsc : <span>12312312</span></p>
                                                    <p className="bank-number">Upi : <span>12312312</span></p>
                                                </div>
                                                <div className="bank-bottom">
                                                    <button type="button" className="bank-btn align d-flex">
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6667 2.66666C14.8877 2.66666 15.0996 2.75445 15.2559 2.91073C15.4122 3.06701 15.5 3.27898 15.5 3.49999C15.5 3.721 15.4122 3.93296 15.2559 4.08925C15.0996 4.24553 14.8877 4.33332 14.6667 4.33332H13.8333L13.8308 4.39249L13.0533 15.285C13.0234 15.7055 12.8352 16.099 12.5268 16.3863C12.2183 16.6736 11.8124 16.8333 11.3908 16.8333H4.60833C4.18678 16.8333 3.78089 16.6736 3.4724 16.3863C3.16392 16.099 2.97576 15.7055 2.94583 15.285L2.16833 4.39332C2.16707 4.37335 2.16651 4.35334 2.16667 4.33332H1.33333C1.11232 4.33332 0.900358 4.24553 0.744078 4.08925C0.587797 3.93296 0.5 3.721 0.5 3.49999C0.5 3.27898 0.587797 3.06701 0.744078 2.91073C0.900358 2.75445 1.11232 2.66666 1.33333 2.66666H14.6667ZM12.1642 4.33332H3.83583L4.60917 15.1667H11.3908L12.1642 4.33332ZM9.66667 0.166656C9.88768 0.166656 10.0996 0.254454 10.2559 0.410734C10.4122 0.567014 10.5 0.778976 10.5 0.99999C10.5 1.221 10.4122 1.43297 10.2559 1.58925C10.0996 1.74553 9.88768 1.83332 9.66667 1.83332H6.33333C6.11232 1.83332 5.90036 1.74553 5.74408 1.58925C5.5878 1.43297 5.5 1.221 5.5 0.99999C5.5 0.778976 5.5878 0.567014 5.74408 0.410734C5.90036 0.254454 6.11232 0.166656 6.33333 0.166656H9.66667Z" fill="#D03438" />
                                                        </svg>
                                                        REMOVE
                                                    </button>
                                                </div>
                                                </label>
                                            </div>
                                            <div className="bank-item">
                                                {/* checked={address?.isDefault === true} onChange={()=>defaultAddress(address?._id)} */}
                                                <input className="radio-input" type="radio" id="html" name="fav_language" value="HTML" ></input>
                                                <label htmlFor="html">
                                                <div className="bank-details">
                                                    <p className="bank-number">Account Number: <span>Icic bank</span></p>
                                                    <p className="bank-number">Bank Name: <span>Icic bank</span></p>
                                                    <p className="bank-number">Ifsc : <span>12312312</span></p>
                                                    <p className="bank-number">Upi : <span>12312312</span></p>
                                                </div>
                                                <div className="bank-bottom">
                                                    <button type="button" className="bank-btn align d-flex">
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6667 2.66666C14.8877 2.66666 15.0996 2.75445 15.2559 2.91073C15.4122 3.06701 15.5 3.27898 15.5 3.49999C15.5 3.721 15.4122 3.93296 15.2559 4.08925C15.0996 4.24553 14.8877 4.33332 14.6667 4.33332H13.8333L13.8308 4.39249L13.0533 15.285C13.0234 15.7055 12.8352 16.099 12.5268 16.3863C12.2183 16.6736 11.8124 16.8333 11.3908 16.8333H4.60833C4.18678 16.8333 3.78089 16.6736 3.4724 16.3863C3.16392 16.099 2.97576 15.7055 2.94583 15.285L2.16833 4.39332C2.16707 4.37335 2.16651 4.35334 2.16667 4.33332H1.33333C1.11232 4.33332 0.900358 4.24553 0.744078 4.08925C0.587797 3.93296 0.5 3.721 0.5 3.49999C0.5 3.27898 0.587797 3.06701 0.744078 2.91073C0.900358 2.75445 1.11232 2.66666 1.33333 2.66666H14.6667ZM12.1642 4.33332H3.83583L4.60917 15.1667H11.3908L12.1642 4.33332ZM9.66667 0.166656C9.88768 0.166656 10.0996 0.254454 10.2559 0.410734C10.4122 0.567014 10.5 0.778976 10.5 0.99999C10.5 1.221 10.4122 1.43297 10.2559 1.58925C10.0996 1.74553 9.88768 1.83332 9.66667 1.83332H6.33333C6.11232 1.83332 5.90036 1.74553 5.74408 1.58925C5.5878 1.43297 5.5 1.221 5.5 0.99999C5.5 0.778976 5.5878 0.567014 5.74408 0.410734C5.90036 0.254454 6.11232 0.166656 6.33333 0.166656H9.66667Z" fill="#D03438" />
                                                        </svg>
                                                        REMOVE
                                                    </button>
                                                </div>
                                                </label>
                                            </div>
                                            <div className="bank-item">
                                                {/* checked={address?.isDefault === true} onChange={()=>defaultAddress(address?._id)} */}
                                                <input className="radio-input" type="radio" id="html" name="fav_language" value="HTML" ></input>
                                                <label htmlFor="html">
                                                <div className="bank-details">
                                                    <p className="bank-number">Account Number: <span>Icic bank</span></p>
                                                    <p className="bank-number">Bank Name: <span>Icic bank</span></p>
                                                    <p className="bank-number">Ifsc : <span>12312312</span></p>
                                                    <p className="bank-number">Upi : <span>12312312</span></p>
                                                </div>
                                                <div className="bank-bottom">
                                                    <button type="button" className="bank-btn align d-flex">
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6667 2.66666C14.8877 2.66666 15.0996 2.75445 15.2559 2.91073C15.4122 3.06701 15.5 3.27898 15.5 3.49999C15.5 3.721 15.4122 3.93296 15.2559 4.08925C15.0996 4.24553 14.8877 4.33332 14.6667 4.33332H13.8333L13.8308 4.39249L13.0533 15.285C13.0234 15.7055 12.8352 16.099 12.5268 16.3863C12.2183 16.6736 11.8124 16.8333 11.3908 16.8333H4.60833C4.18678 16.8333 3.78089 16.6736 3.4724 16.3863C3.16392 16.099 2.97576 15.7055 2.94583 15.285L2.16833 4.39332C2.16707 4.37335 2.16651 4.35334 2.16667 4.33332H1.33333C1.11232 4.33332 0.900358 4.24553 0.744078 4.08925C0.587797 3.93296 0.5 3.721 0.5 3.49999C0.5 3.27898 0.587797 3.06701 0.744078 2.91073C0.900358 2.75445 1.11232 2.66666 1.33333 2.66666H14.6667ZM12.1642 4.33332H3.83583L4.60917 15.1667H11.3908L12.1642 4.33332ZM9.66667 0.166656C9.88768 0.166656 10.0996 0.254454 10.2559 0.410734C10.4122 0.567014 10.5 0.778976 10.5 0.99999C10.5 1.221 10.4122 1.43297 10.2559 1.58925C10.0996 1.74553 9.88768 1.83332 9.66667 1.83332H6.33333C6.11232 1.83332 5.90036 1.74553 5.74408 1.58925C5.5878 1.43297 5.5 1.221 5.5 0.99999C5.5 0.778976 5.5878 0.567014 5.74408 0.410734C5.90036 0.254454 6.11232 0.166656 6.33333 0.166656H9.66667Z" fill="#D03438" />
                                                        </svg>
                                                        REMOVE
                                                    </button>
                                                </div>
                                                </label>
                                            </div>
                                            <div className="bank-item">
                                                {/* checked={address?.isDefault === true} onChange={()=>defaultAddress(address?._id)} */}
                                                <input className="radio-input" type="radio" id="html" name="fav_language" value="HTML" ></input>
                                                <label htmlFor="html">
                                                <div className="bank-details">
                                                    <p className="bank-number">Account Number: <span>Icic bank</span></p>
                                                    <p className="bank-number">Bank Name: <span>Icic bank</span></p>
                                                    <p className="bank-number">Ifsc : <span>12312312</span></p>
                                                    <p className="bank-number">Upi : <span>12312312</span></p>
                                                </div>
                                                <div className="bank-bottom">
                                                    <button type="button" className="bank-btn align d-flex">
                                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6667 2.66666C14.8877 2.66666 15.0996 2.75445 15.2559 2.91073C15.4122 3.06701 15.5 3.27898 15.5 3.49999C15.5 3.721 15.4122 3.93296 15.2559 4.08925C15.0996 4.24553 14.8877 4.33332 14.6667 4.33332H13.8333L13.8308 4.39249L13.0533 15.285C13.0234 15.7055 12.8352 16.099 12.5268 16.3863C12.2183 16.6736 11.8124 16.8333 11.3908 16.8333H4.60833C4.18678 16.8333 3.78089 16.6736 3.4724 16.3863C3.16392 16.099 2.97576 15.7055 2.94583 15.285L2.16833 4.39332C2.16707 4.37335 2.16651 4.35334 2.16667 4.33332H1.33333C1.11232 4.33332 0.900358 4.24553 0.744078 4.08925C0.587797 3.93296 0.5 3.721 0.5 3.49999C0.5 3.27898 0.587797 3.06701 0.744078 2.91073C0.900358 2.75445 1.11232 2.66666 1.33333 2.66666H14.6667ZM12.1642 4.33332H3.83583L4.60917 15.1667H11.3908L12.1642 4.33332ZM9.66667 0.166656C9.88768 0.166656 10.0996 0.254454 10.2559 0.410734C10.4122 0.567014 10.5 0.778976 10.5 0.99999C10.5 1.221 10.4122 1.43297 10.2559 1.58925C10.0996 1.74553 9.88768 1.83332 9.66667 1.83332H6.33333C6.11232 1.83332 5.90036 1.74553 5.74408 1.58925C5.5878 1.43297 5.5 1.221 5.5 0.99999C5.5 0.778976 5.5878 0.567014 5.74408 0.410734C5.90036 0.254454 6.11232 0.166656 6.33333 0.166656H9.66667Z" fill="#D03438" />
                                                        </svg>
                                                        REMOVE
                                                    </button>
                                                </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="withdraw-card withdraw-right">
                                        <p>The User hereby consents</p>
                                        <form>
                                            <div className="form-group">
                                                <input className="form-control error" placeholder="Withdraw Amount" type="text" value="" name="name" />
                                                <div className="error-message">Name is required</div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="w-full anchor-button hovertime">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="terms">
                                    <h4 className="attrimdheading">Term & Condition</h4>
                                    <p>The User hereby consents, expresses and agrees that he has read and fully understands the Privacy Policy</p>
                                    <ul>
                                        <li>The User hereby consents</li>
                                        <li>The User hereby consents</li>
                                        <li>The User hereby consents</li>
                                        <li>The User hereby consents</li>
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
                                        <tr>
                                            <td>₹378</td>
                                            <td>Panding</td>
                                            <td>22-03-2025</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <div className="attri-popup newaddress-popup addbank-popup">
                <div className="attri-popup-overlay"></div>
                <div className="attri-popup-wrapper">
                    {/* onClick={closePopup} */}
                    <button className="attri-popup-close" ><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
                    <div className="attri-popup-body d-flex align">
                        <h1 className="attrimdheading">Add Bank Detail</h1>
                        <div className="attri-popup-form">
                            <form>
                                <div className="form-row d-flex">
                                    <div className="form-group">
                                        <label className="form-label">Name</label>
                                        {/* {...formik.getFieldProps('name')} */}
                                        <input type="text" className="form-control" placeholder="Name"/>
                                        {/* {formik.touched.name && formik.errors.name && (
                                            <div className="error-message">{formik.errors.name}</div>
                                        )} */}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Bank Name</label>
                                        {/* {...formik.getFieldProps('name')} */}
                                        <input type="text" className="form-control" placeholder="Bank Name"/>
                                        {/* {formik.touched.name && formik.errors.name && (
                                            <div className="error-message">{formik.errors.name}</div>
                                        )} */}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Ifsc Code</label>
                                        {/* {...formik.getFieldProps('name')} */}
                                        <input type="text" className="form-control" placeholder="Ifsc Code"/>
                                        {/* {formik.touched.name && formik.errors.name && (
                                            <div className="error-message">{formik.errors.name}</div>
                                        )} */}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label">Accont Number</label>
                                        {/* {`form-control ${
                                                formik.touched.mobileNumber && formik.errors.mobileNumber ? 'error' : ''
                                            }`} */}
                                        <input type="tel"
                                            className="form-control" 
                                            placeholder="Accont Number"
                                            // {...formik.getFieldProps('mobileNumber')}
                                        />
                                        {/* {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                                            <div className="error-message">{formik.errors.mobileNumber as string}</div>
                                        )} */}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Upi</label>
                                        {/* {`form-control ${
                                                formik.touched.mobileNumber && formik.errors.mobileNumber ? 'error' : ''
                                            }`} */}
                                        <input type="tel"
                                            className="form-control" 
                                            placeholder="Upi"
                                            // {...formik.getFieldProps('mobileNumber')}
                                        />
                                        {/* {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                                            <div className="error-message">{formik.errors.mobileNumber as string}</div>
                                        )} */}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Upload</label>
                                        {/* {`form-control ${
                                                formik.touched.mobileNumber && formik.errors.mobileNumber ? 'error' : ''
                                            }`} */}
                                        <input type="file"
                                            className="form-control" 
                                            placeholder="Upi"
                                            // {...formik.getFieldProps('mobileNumber')}
                                        />
                                        {/* {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                                            <div className="error-message">{formik.errors.mobileNumber as string}</div>
                                        )} */}
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            type="submit" 
                                            className="w-full anchor-button hovertime"
                                            // disabled={formik.isSubmitting}
                                        >
                                            {/* {formik.isSubmitting ? 'Saving...' : 'Save'} */}
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
}