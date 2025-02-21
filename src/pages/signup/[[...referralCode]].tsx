
import Link from "next/link";
import React from 'react';
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
import "@/styles/popup.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function SignUp() {
    const router = useRouter();
    const { referralCode } = router.query;

    // Log to debug
    console.log('Router query:', router.query);
    console.log('Current path:', router.asPath);

    const [otpStep, setOtpStep] = useState(true);
  const otpFormik = useFormik({
    initialValues: {
      otp: ['', '', '', ''],
    },
    validationSchema: Yup.object({
      otp: Yup.array().of(
        Yup.string()
          .matches(/^[0-9]$/, 'Must be a single digit')
          .required('Required')
      ).length(4, 'Must be exactly 4 digits'),
    }),
    onSubmit: (values) => {
      console.log('OTP:', values.otp.join(''));
    
      // Handle OTP verification here
    },
  });

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otpFormik.values.otp];
    newOtp[index] = value;
    otpFormik.setFieldValue('otp', newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[name="otp[${index + 1}]"]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const signupFormik = useFormik({
    initialValues: {
      referralCode: '',
      name: '',
      mobileNumber: '',
    },
    validationSchema: Yup.object({
      referralCode: Yup.string(),
      name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
      mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
    }),
    onSubmit: (values) => {
        toast.success('OTP sent to your mobile number');
      console.log('Form submitted:', values);
      setOtpStep(false);
      // Handle form submission here
    },
  });

//   useEffect(() => {
//     // Get referral code from URL path
//     const path = router.asPath;
//     const code = path.split('/signup/')[1];
//     if (code) {
//         console.log('Setting referral code:', code);
//         signupFormik.setFieldValue('referralCode', code);
//     }
//   }, [router.asPath]);
useEffect(() => {
    // Check if referralCode is an array and has a valid string value
    if (Array.isArray(referralCode) && referralCode[0]) {
      console.log('Setting referral code:', referralCode[0]);
      signupFormik.setFieldValue('referralCode', referralCode[0]);
    }
  }, [referralCode]);

  return (
    <div className="sign-box padding-tb">
        <div className="container">
            <div className="sign-main d-flex align">
                <div className="sign-left">
                    <Image width={676} height={548} className="w-full" src={'/assets/images/new-banner.jpg'} alt=""></Image>
                </div>
                <div className="sign-right">
                    {/* signup css globals 311*/}
                    {otpStep ? (
                    <div className="signup-step-one">
                        <div className="sign-top">
                            <div className="attrilgheading">Sign Up</div>
                            <p>Your are join with <span>himanshu</span></p>
                        </div>
                        <form onSubmit={signupFormik.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="referralCode"
                                    className={`form-control ${
                                        signupFormik.touched.referralCode && signupFormik.errors.referralCode ? 'error' : ''
                                    }`}
                                    placeholder="Referral Code"
                                    {...signupFormik.getFieldProps('referralCode')}
                                />
                                {signupFormik.touched.referralCode && signupFormik.errors.referralCode && (
                                    <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                        {signupFormik.errors.referralCode}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className={`form-control ${
                                        signupFormik.touched.name && signupFormik.errors.name ? 'error' : ''
                                    }`}
                                    placeholder="Name"
                                    {...signupFormik.getFieldProps('name')}
                                />
                                {signupFormik.touched.name && signupFormik.errors.name && (
                                    <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                        {signupFormik.errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    className={`form-control ${
                                        signupFormik.touched.mobileNumber && signupFormik.errors.mobileNumber ? 'error' : ''
                                    }`}
                                    placeholder="Enter Mobile Number"
                                    {...signupFormik.getFieldProps('mobileNumber')}
                                />
                                {signupFormik.touched.mobileNumber && signupFormik.errors.mobileNumber && (
                                    <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                        {signupFormik.errors.mobileNumber}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <button 
                                    type="submit" 
                                    className="w-full anchor-button hovertime"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>  
                    ) : (
                    <div className="signup-step-two">
                        <div className="attrismheading">OTP Verification</div>
                        <div className="verifi">
                            <p>We have sent verification code to</p>
                            <div className="verifi-number">
                            +917042549650
                            <button type="button" className="editbtn" onClick={() => setOtpStep(true)}>Edit</button>
                            </div>
                        </div>
                        <form onSubmit={otpFormik.handleSubmit}>
                            <div className="otp-code dflex">
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                key={index}
                                type="text"
                                maxLength={1}
                                name={`otp[${index}]`}
                                className={`otp-input ${
                                    otpFormik.touched.otp && otpFormik.errors.otp ? 'error' : ''
                                }`}
                                value={otpFormik.values.otp[index]}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !otpFormik.values.otp[index] && index > 0) {
                                    const prevInput = document.querySelector(
                                        `input[name="otp[${index - 1}]"]`
                                    ) as HTMLInputElement;
                                    if (prevInput) prevInput.focus();
                                    }
                                }}
                                />
                            ))}
                            </div>
                            {otpFormik.touched.otp && otpFormik.errors.otp && (
                                <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                    {typeof otpFormik.errors.otp === 'string' 
                                        ? otpFormik.errors.otp 
                                        : 'Please enter a valid OTP'}
                                </div>
                            )}
                            <div className="form-group">
                            <button type="button" className="resend">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1333 9.5L13.8004 8.16667L12.4666 9.5M14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C10.2013 2.5 12.1257 3.68542 13.1697 5.45273M8 5.16667V8.5L10 9.83333" stroke="#dce9ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                Resend OTP
                            </button>
                            </div>
                            <div className="form-group">
                            <button type="submit" className="w-full anchor-button hovertime">Verify</button>
                            </div>
                        </form>
                    </div>
                    )} 
                </div>
            </div>
        </div>
    </div>
  );
}