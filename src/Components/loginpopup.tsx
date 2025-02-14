import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/popup.css";
export default function LoginPopup() {
  return (
      <div className="attri-popup login-popup">
        <div className="attri-popup-overlay"></div>
        <div className="attri-popup-wrapper">
          <button className="attri-popup-close"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
          <div className="attri-popup-body d-flex align">
              <div className="login-left">
                <Image width={676} height={548} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
                {/* <div className="login-content">
                  <div className="attrismheading">Access orders, track orders, redeem Plixlife cash!</div>
                </div> */}
              </div>
              <div className="login-box">
                <div className="login-step-one">
                  <div className="attrismheading">Unlock Superior Discounts</div>
                  <form>
                    <div className="form-group">
                      <input type="number" className="form-control" placeholder="Enter Mobile Number"></input>
                    </div>
                    <div className="form-group dflex align">
                      <input type="checkbox" className="checkbox" id="notify" name="notify" value="notify"></input>
                      <label htmlFor="notify">Notify me for any updates & offers</label>
                    </div>
                  </form>
                  <p className="ortxt">OR</p>
                  <button className="anchor-button anchor-button-line hovertime">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5862 2.90651C15.7062 1.03279 13.2062 0.00110577 10.5423 0C5.05284 0 0.585617 4.44518 0.583394 9.90988C0.582283 11.6564 1.04117 13.3615 1.91284 14.8643L0.500061 20L5.77895 18.6222C7.23339 19.4123 8.87117 19.8275 10.5378 19.8281H10.5423C16.0306 19.8281 20.4984 15.3823 20.5001 9.91817C20.5012 7.26986 19.4662 4.77968 17.5862 2.90651ZM10.5423 18.1545H10.5389C9.05395 18.1545 7.59728 17.757 6.32617 17.0061L6.02395 16.8276L2.89117 17.6453L3.72728 14.6055L3.53062 14.2937C2.70228 12.9823 2.26451 11.4662 2.26506 9.90988C2.26673 5.3685 5.98006 1.67358 10.5456 1.67358C12.7562 1.67468 14.8345 2.53221 16.3973 4.08968C17.9601 5.6466 18.8201 7.71659 18.819 9.91707C18.8167 14.459 15.104 18.1545 10.5423 18.1545ZM15.0823 11.9854C14.8334 11.8616 13.6101 11.2628 13.3817 11.1799C13.1534 11.0969 12.9878 11.056 12.8223 11.3037C12.6567 11.5519 12.1795 12.1098 12.0345 12.2746C11.8895 12.4399 11.744 12.4603 11.4956 12.3365C11.2467 12.2126 10.4451 11.9511 9.49451 11.1074C8.75506 10.4506 8.25562 9.64007 8.11006 9.39183C7.96506 9.14358 8.09451 9.00979 8.21895 8.88649C8.33062 8.77536 8.46784 8.59734 8.59228 8.45248C8.71673 8.30818 8.75784 8.20424 8.84117 8.03948C8.92451 7.87416 8.88284 7.72986 8.82062 7.60546C8.7584 7.48162 8.26117 6.26251 8.0534 5.76713C7.85117 5.28446 7.64617 5.3497 7.49395 5.34196C7.34895 5.33477 7.18284 5.33367 7.01673 5.33367C6.85062 5.33367 6.58117 5.39559 6.35284 5.64328C6.12451 5.89152 5.48173 6.4903 5.48173 7.70885C5.48173 8.92741 6.37339 10.105 6.49784 10.2709C6.62228 10.4362 8.25284 12.9375 10.7484 14.0101C11.3417 14.2655 11.8056 14.4175 12.1673 14.532C12.7634 14.7205 13.3056 14.694 13.7345 14.6304C14.2123 14.5591 15.2067 14.0311 15.414 13.4528C15.6212 12.8744 15.6212 12.3785 15.559 12.2751C15.4967 12.1717 15.3312 12.1093 15.0823 11.9854Z" fill="#25D366"/>
                    </svg>
                    Whatsapp Login
                  </button>
                  <div className="login-footer">
                    <p>I accept that I have read & understood Gokwik's</p>
                    <Link href='/'>Privacy Policy</Link>
                    <Link href='/'>and T&Cs.</Link>
                    <p><Link href='/'>Sign Up</Link></p>
                  </div>
                </div>
                <div className="login-step-two">
                  <div className="attrismheading">OTP Verification</div>
                  <div className="verifi">
                    <p>We have sent verification code to</p>
                    <div className="verifi-number">
                      +917042549650
                      <button className="editbtn">Edit</button>
                    </div>
                  </div>
                  <form>
                    <div className="otp-code dflex">
                      <input type="number" className="otp-input"></input>
                      <input type="number" className="otp-input"></input>
                      <input type="number" className="otp-input"></input>
                      <input type="number" className="otp-input"></input>
                    </div>
                    <div className="form-group">
                      <button className="resend">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1333 9.5L13.8004 8.16667L12.4666 9.5M14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C10.2013 2.5 12.1257 3.68542 13.1697 5.45273M8 5.16667V8.5L10 9.83333" stroke="#dce9ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        Resend OTP
                      </button>
                    </div>
                    <div className="form-group">
                      <button className="anchor-button hovertime">Verify</button>
                    </div>
                  </form>
                  <div className="login-footer">
                    <p><Link href='/'>Sign Up</Link></p>
                  </div>

                </div>
                <div className="login-step-three">
                  <div className="attrismheading">Enter your email address</div>
                  <form>
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder="Enter Email Address"></input>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Enter name"></input>
                    </div>
                    <div className="form-group">
                      <button className="anchor-button hovertime">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
  );
}