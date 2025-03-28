import Link from "next/link";
import React from 'react';
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
// import "@/styles/popup.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setUser } from "@/slices/userSlice";
import { setReduxToken } from "@/slices/tokenSlice";
import { getData, postData } from '@/services/apiServices';
import { format } from 'date-fns';

export default function SignUp() {
    const router = useRouter();
    const { referralCode } = router.query;
    const dispatch = useAppDispatch();
    const isTokenSet = useAppSelector((state: any) => state.token.isTokenSet);
    const token = useAppSelector((state: any) => state.token.token);
    const user = useAppSelector((state: any) => state.user); 
    const [refrralby,setRefrralby] = useState<any>();
    const [signuploading,setSignuploading] = useState<boolean>(false);
    // Log to debug
    // console.log('Router query:', router.query);
    // console.log('Current path:', router.asPath);

    const [otpStep, setOtpStep] = useState(true);
    const [resendTimer, setResendTimer] = useState<number>(120); // 3 minutes in seconds
    const [resendDisabled, setResendDisabled] = useState<boolean>(true);

    const [recommendedUsers,setRecommendedUsers] = useState<any[]>([]);

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
        onSubmit: async (values) => {
            console.log('OTP:', values.otp.join(''));
            console.log('Signup Form Values:', signupFormik.values);
            // Handle OTP verification here
            const data = {
                otp:values.otp.join(''),
                phone:signupFormik.values.mobileNumber,
                username:signupFormik.values.name,
                referralcode:signupFormik.values.referralCode,
                dateofbirth:signupFormik.values.dateOfBirth
            }
            await postData('verify-otp',data).then((res:any)=>{
                console.log(res);
                // toast.success(res?.message);
                // router.push('/');
                dispatch(setReduxToken(res?.data?.token));
                dispatch(setUser({ 
                    id:res?.data?.user?._id,
                    name:res?.data?.user?.username,
                    balance:res?.data?.user?.balance,
                    phone:res?.data?.user?.phone,
                }));
                router.push('/');
                otpFormik.resetForm();
            }).catch((err:any)=>{
                console.log(err);
                toast.error("Something went wrong");
                otpFormik.resetForm();
            })
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
    const [showreferral,setShowreferral] = useState<boolean>(false);

    const fetchReferralData = async (code: string) => {
        getData(`/user/referral/${code}`).then((res:any)=>{
            console.log(res);
            setRefrralby(res?.data?.user)
            setShowreferral(true);
        }).catch((err:any)=>{
            console.log(err);
        })
    };
    const resentOtp = async ()=>{
        const data = {
            phone:signupFormik.values.mobileNumber,
        }
        await postData('send-otp',data).then((res:any)=>{
            console.log(res);
            toast.success(res?.data?.message);
        }).catch((err:any)=>{
            console.log(err);
            toast.error("Something went wrong");
        })
    }

    const signupFormik = useFormik({
        initialValues: {
            referralCode: '',
            name: '',
            mobileNumber: '',
            dateOfBirth: '',
        },
        validationSchema: Yup.object({
            // referralCode: Yup.string().required('Referral code is required'),
            name: Yup.string()
                .required('Name is required')
                .min(2, 'Name must be at least 2 characters'),
            mobileNumber: Yup.string()
                .required('Mobile number is required')
                .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
            dateOfBirth: Yup.date()
                .required('Date of birth is required')
                .max(new Date(), 'Date of birth cannot be in the future')
                .test('age', 'You must be at least 18 years old', function(value) {
                    if (!value) return false;
                    const today = new Date();
                    const birthDate = new Date(value);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    return age >= 18;
                }),
        }),
        onSubmit: async (values) => {
            setSignuploading(true);
            // toast.success('OTP sent to your mobile number');
        //   console.log('Form submitted:', values);
       
        //   dispatch(setUser({ name:values.name ,id:values.mobileNumber,balance:"20", }));
        const data = {
            phone:values.mobileNumber,
            newuser:true
        }
            await postData('send-otp',data).then((res:any)=>{
                console.log(res);
                toast.success(res?.data?.message);
                setOtpStep(false);
                setSignuploading(false);
            }).catch((err:any)=>{
                console.log(err);
                toast.error(err?.response?.data?.message || "Something went wrong");
                setSignuploading(false);
            })
        },
    });

    // Watch for manual changes to referral code field
    useEffect(() => {
        if (signupFormik.values.referralCode) {
            fetchReferralData(signupFormik.values.referralCode);
        }
    }, [signupFormik.values.referralCode]);

    // Watch for URL referral code
    useEffect(() => {
        if (Array.isArray(referralCode) && referralCode[0]) {
            console.log('Setting referral code:', referralCode[0]);
            signupFormik.setFieldValue('referralCode', referralCode[0]);

            fetchReferralData(referralCode[0]);
            // No need to call fetchReferralData here as it will be triggered by the above useEffect
        }
    }, [referralCode]);
    useEffect(()=>{
        if(token){
            router.push('/');
        }
    },[token])

    useEffect(() => {
        // Start countdown when OTP step is active
        if (!otpStep) {
            const timer = setInterval(() => {
                setResendTimer((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setResendDisabled(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [otpStep]);

    // Format time as mm:ss
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResendOtp = () => {
        resentOtp();
        setResendTimer(180); // Reset timer to 3 minutes
        setResendDisabled(true);
    };

    const getrecommended = async ()=>{
        await getData('/recommended-users').then((res:any)=>{
            console.log(res);
            setRecommendedUsers(res?.data?.users);      
        }).catch((err:any)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getrecommended();
    },[])

    return (
        <div className="sign-box padding-tb">
            <div className="container">
                <div className="sign-main d-flex align">
                    <div className="sign-left">
                        <Image width={676} height={548} className="w-full" src={'https://res.cloudinary.com/doz4dnf0h/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1742919806/login_03_luywts.jpg'} alt=""></Image>
                    </div>
                    <div className="sign-right">
                        {/* signup css globals 311*/}
                        {otpStep ? (
                        <div className="signup-step-one">
                            <div className="sign-top">
                                <div className="attrilgheading">Sign Up </div>
                                {(refrralby || signupFormik.values.referralCode) && <p>Your are joining with <span>{refrralby?.username ? refrralby?.username : 'Laoding...'}</span></p>}
                            </div>
                            {!(refrralby || signupFormik.values.referralCode) &&  recommendedUsers?.length > 0 && <div className="flex justify-center items-center overflow-y-scroll mb-2 gap-2">
                                <div className="text-sm ">Suggested Referrals</div>
                           {recommendedUsers?.map((item:any)=>(
                            <div 
                              key={item._id}
                              className="flex items-center rounded-full bg-[#282936] px-2 py-1 text-xs text-white whitespace-nowrap cursor-pointer hover:bg-[#3a3b4a] transition-colors"
                              onClick={() => {
                                signupFormik.setFieldValue('referralCode', item.referral_code);
                                fetchReferralData(item.referral_code);
                              }}
                            >
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1V15M1 8H15" stroke="white" stroke-width="2" stroke-linecap="round"/>
                              </svg>
                              <span className="ml-2">{item?.referral_code}</span>
                            </div>
                           ))}
                          
                            
                            

                            </div>
                            }
                                <form onSubmit={signupFormik.handleSubmit}>
                                    <div className="form-group">
                                    <input
                                        type="text"
                                        // name="referralCode"
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
                                        // name="name"
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
                                
                                {/* Date of Birth Field - Modern UI */}
                                <div className="form-group mt-2">
                                    <div className="relative">
                                        <div className="flex items-center">
                                            <input
                                                type="date"
                                                id="dateOfBirth"
                                                className={`form-control pr-10 ${
                                                    signupFormik.touched.dateOfBirth && signupFormik.errors.dateOfBirth ? 'error' : ''
                                                }`}
                                                placeholder="Date of Birth"
                                                max={format(new Date(), 'yyyy-MM-dd')}
                                                {...signupFormik.getFieldProps('dateOfBirth')}
                                            />
                                            <label 
                                                htmlFor="dateOfBirth" 
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                            >
                                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                                    />
                                                </svg>
                                            </label>
                                        </div>
                                        <div className="absolute -top-6 left-2 text-xs font-medium text-gray-500 transition-all mt-2">
                                            Date of Birth
                                        </div>
                                    </div>
                                    {signupFormik.touched.dateOfBirth && signupFormik.errors.dateOfBirth && (
                                        <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                                            {typeof signupFormik.errors.dateOfBirth === 'string' ? signupFormik.errors.dateOfBirth : 'Invalid date'}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="form-group">
                                    <button 
                                        disabled={signuploading}
                                        type="submit" 
                                        className="w-full anchor-button hovertime"
                                    >
                                        {signuploading ? 'Signing Up...' : 'Sign Up'}
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
                                +91{signupFormik.values.mobileNumber}
                                <button type="button" className="editbtn" onClick={() => setOtpStep(true)}>Edit</button>
                                </div>
                            </div>
                            <form onSubmit={otpFormik.handleSubmit}>
                                <div className="otp-code dflex">
                                {[0, 1, 2, 3].map((index) => (
                                    <input
                                    key={index}
                                    type="number"
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
                                    onPaste={(e) => {
                                        // Prevent default paste behavior
                                        e.preventDefault();
                                        
                                        // Get pasted data
                                        const pastedData = e.clipboardData.getData('text');
                                        
                                        // Extract digits only
                                        const digits = pastedData.replace(/[^0-9]/g, '').substring(0, 4);
                                        
                                        // Only proceed if we have digits
                                        if (digits.length > 0) {
                                            // Create new OTP array
                                            const newOtp = [...otpFormik.values.otp];
                                            
                                            // Fill in the digits
                                            for (let i = 0; i < digits.length; i++) {
                                                if (index + i < 4) {
                                                    newOtp[index + i] = digits[i];
                                                }
                                            }
                                            
                                            // Update formik state
                                            otpFormik.setFieldValue('otp', newOtp);
                                            
                                            // Focus on next empty field or last field
                                            const nextEmptyIndex = newOtp.findIndex(val => !val);
                                            const nextInput = document.querySelector(
                                                `input[name="otp[${nextEmptyIndex !== -1 ? nextEmptyIndex : 3}]"]`
                                            ) as HTMLInputElement;
                                            if (nextInput) nextInput.focus();
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
                                {resendDisabled ? (
                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mt-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 2.5V8L10.5 10.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="8" cy="8" r="6" stroke="#9CA3AF" strokeWidth="1.5"/>
                                        </svg>
                                        <span className="font-medium">Request new code in {formatTime(resendTimer)}</span>
                                    </div>
                                ) : (
                                    <button 
                                        type="button" 
                                        className="resend" 
                                        onClick={handleResendOtp}
                                    >
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.1333 9.5L13.8004 8.16667L12.4666 9.5M14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C10.2013 2.5 12.1257 3.68542 13.1697 5.45273M8 5.16667V8.5L10 9.83333" stroke="#dce9ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Resend OTP
                                    </button>
                                )}
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