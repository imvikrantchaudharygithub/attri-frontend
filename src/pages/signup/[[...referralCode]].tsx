import Link from "next/link";
import React from 'react';
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
// import "@/styles/popup.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
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
    const [refrralLoading,setRefrralLoading] = useState<boolean>(false);
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
        setRefrralLoading(true);
        getData(`/user/referral/${code}`).then((res:any)=>{
            console.log(res);
            setRefrralby(res?.data?.user)
            setShowreferral(true);
        }).catch((err:any)=>{
            console.log(err);
            setShowreferral(false);
            setRefrralby(null)

        }).finally(()=>{
            setRefrralLoading(false);
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
            referralCode: Yup.string().required('Referral code is required'),
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
            if(refrralby === null){
                toast.error("Referral code is not valid");
                setSignuploading(false);
                return;
            }
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

    const inputClass = (touched: boolean, error: string | undefined) =>
        `w-full h-12 px-4 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B35B8]/20 ${
            touched && error ? "border-red-400 bg-red-50" : "border-[#E5E7EB] focus:border-[#8B35B8] bg-white"
        }`;

    return (
        <section className="bg-[#FAF9FF] min-h-screen py-8 md:py-12">
            <div className="container">
                <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex flex-col md:flex-row bg-white">
                    {/* Left image */}
                    <div className="hidden md:block md:w-2/5 relative">
                        <Image
                            width={480}
                            height={600}
                            className="w-full h-full object-cover"
                            src="https://res.cloudinary.com/doz4dnf0h/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1742919806/login_03_luywts.jpg"
                            alt="Sign up"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#8B35B8]/20" />
                        <div className="absolute bottom-8 left-6 right-6">
                            <h3 className="text-white text-2xl font-bold font-heading italic leading-tight">
                                Join the Attri Family
                            </h3>
                            <p className="text-white/70 text-sm mt-1">Natural products. Real earnings.</p>
                        </div>
                    </div>

                    {/* Right form */}
                    <div className="flex-1 p-6 md:p-8">
                        {/* Brand */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-[#8B35B8] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <span className="font-bold text-[#8B35B8] font-heading text-sm">Attri Industries</span>
                        </div>

                        {otpStep ? (
                            <div>
                                <h1 className="text-2xl font-bold text-[#8B35B8] font-heading italic mb-1">Create Account</h1>
                                <p className="text-[#6B7280] text-sm mb-5">Fill in your details to get started</p>

                                {/* Referral status */}
                                {(refrralby || signupFormik.values.referralCode) && (
                                    <div className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl mb-4 ${refrralby ? 'bg-[#f0fdf4] text-[#16A34A] border border-[#bbf7d0]' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            {refrralby ? <path d="M20 6L9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
                                        </svg>
                                        Joining with: <strong>{refrralby?.username || 'Not Found'}</strong>
                                    </div>
                                )}

                                {/* Suggested referrals */}
                                {!(refrralby || signupFormik.values.referralCode) && recommendedUsers?.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-[#6B7280] mb-2">Suggested referrals:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {recommendedUsers.map((item: any) => (
                                                <button
                                                    key={item._id}
                                                    type="button"
                                                    className="flex items-center gap-1 rounded-full bg-[#8B35B8] px-3 py-1 text-xs text-white hover:bg-[#5C1F82] transition-colors cursor-pointer"
                                                    onClick={() => {
                                                        signupFormik.setFieldValue("referralCode", item.referral_code);
                                                        fetchReferralData(item.referral_code);
                                                    }}
                                                >
                                                    <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                                                    {item?.referral_code}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={signupFormik.handleSubmit} className="space-y-3.5">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">Referral Code *</label>
                                        <input type="text" className={inputClass(!!signupFormik.touched.referralCode, signupFormik.errors.referralCode)} placeholder="Enter referral code" {...signupFormik.getFieldProps("referralCode")} />
                                        {signupFormik.touched.referralCode && signupFormik.errors.referralCode && (
                                            <p className="text-red-500 text-xs mt-1">{signupFormik.errors.referralCode}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">Full Name *</label>
                                        <input type="text" className={inputClass(!!signupFormik.touched.name, signupFormik.errors.name)} placeholder="Enter your full name" {...signupFormik.getFieldProps("name")} />
                                        {signupFormik.touched.name && signupFormik.errors.name && (
                                            <p className="text-red-500 text-xs mt-1">{signupFormik.errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">Mobile Number *</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6B7280]">+91</span>
                                            <input type="text" className={`${inputClass(!!signupFormik.touched.mobileNumber, signupFormik.errors.mobileNumber)} pl-11`} placeholder="10-digit number" maxLength={10} {...signupFormik.getFieldProps("mobileNumber")} />
                                        </div>
                                        {signupFormik.touched.mobileNumber && signupFormik.errors.mobileNumber && (
                                            <p className="text-red-500 text-xs mt-1">{signupFormik.errors.mobileNumber}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">Date of Birth *</label>
                                        <input type="date" id="dateOfBirth" className={inputClass(!!signupFormik.touched.dateOfBirth, signupFormik.errors.dateOfBirth as string)} max={format(new Date(), "yyyy-MM-dd")} {...signupFormik.getFieldProps("dateOfBirth")} />
                                        {signupFormik.touched.dateOfBirth && signupFormik.errors.dateOfBirth && (
                                            <p className="text-red-500 text-xs mt-1">{typeof signupFormik.errors.dateOfBirth === "string" ? signupFormik.errors.dateOfBirth : "Invalid date"}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={signuploading}
                                        className="w-full h-12 bg-[#8B35B8] text-white rounded-xl font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        {signuploading ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" /></svg>
                                                Signing Up...
                                            </>
                                        ) : "Sign Up"}
                                    </button>
                                </form>

                                <p className="text-center text-sm mt-4 text-[#6B7280]">
                                    Already have an account? <Link href="/" className="text-[#D4A847] font-semibold hover:text-[#A07810] transition-colors">Login</Link>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-2xl font-bold text-[#8B35B8] font-heading italic mb-1">OTP Verification</h1>
                                <p className="text-[#6B7280] text-sm mb-2">Code sent to</p>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="font-semibold text-[#1A1A1A]">+91 {signupFormik.values.mobileNumber}</span>
                                    <button type="button" className="text-xs text-[#D4A847] border border-[#D4A847] px-2 py-0.5 rounded-full hover:bg-[#D4A847] hover:text-white transition-colors cursor-pointer" onClick={() => setOtpStep(true)}>Edit</button>
                                </div>

                                <form onSubmit={otpFormik.handleSubmit} className="space-y-5">
                                    <div className="flex gap-3 justify-center">
                                        {[0, 1, 2, 3].map((index) => (
                                            <input
                                                key={index}
                                                type="number"
                                                maxLength={1}
                                                name={`otp[${index}]`}
                                                className="w-14 h-14 text-center text-xl font-bold border-2 border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#8B35B8] focus:ring-2 focus:ring-[#8B35B8]/20 transition-all duration-200"
                                                value={otpFormik.values.otp[index]}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Backspace" && !otpFormik.values.otp[index] && index > 0) {
                                                        const prev = document.querySelector(`input[name="otp[${index - 1}]"]`) as HTMLInputElement;
                                                        if (prev) prev.focus();
                                                    }
                                                }}
                                                onPaste={(e) => {
                                                    e.preventDefault();
                                                    const digits = e.clipboardData.getData("text").replace(/\D/g, "").substring(0, 4);
                                                    if (digits) {
                                                        const newOtp = [...otpFormik.values.otp];
                                                        for (let i = 0; i < digits.length; i++) {
                                                            if (index + i < 4) newOtp[index + i] = digits[i];
                                                        }
                                                        otpFormik.setFieldValue("otp", newOtp);
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <div className="text-center text-sm text-[#9CA3AF]">
                                        {resendDisabled ? (
                                            <span>Resend code in <span className="font-semibold text-[#8B35B8]">{formatTime(resendTimer)}</span></span>
                                        ) : (
                                            <button type="button" className="text-[#D4A847] font-semibold cursor-pointer hover:text-[#A07810]" onClick={handleResendOtp}>
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>

                                    <button type="submit" className="w-full h-12 bg-[#8B35B8] text-white rounded-xl font-semibold text-sm hover:bg-[#5C1F82] transition-all duration-200 active:scale-[0.98] cursor-pointer">
                                        Verify &amp; Sign Up
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}