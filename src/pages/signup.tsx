import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import "@/styles/popup.css";
export default function SignUp() {
  return (
    <div className="sign-box padding-tb">
        <div className="container">
            <div className="sign-main d-flex align">
                <div className="sign-left">
                    <Image width={676} height={548} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
                </div>
                <div className="sign-right">
                    {/* signup css globals 311*/}
                    <div className="signup-step-one">
                        <div className="sign-top">
                            <div className="attrilgheading">Sign Up</div>
                            <p>Your are join with <span>himanshu</span></p>
                        </div>
                        <form>
                            <div className="form-group">
                            <input type="text" className="form-control" placeholder="Refrel Code"></input>
                            </div>
                            <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name"></input>
                            </div>
                            <div className="form-group">
                            <input type="number" className="form-control" placeholder="Enter Mobile Number"></input>
                            </div>
                            <div className="form-group">
                            <button className="w-full anchor-button hovertime">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-step-two">
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
                            <button className="w-full anchor-button hovertime">Verify</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}