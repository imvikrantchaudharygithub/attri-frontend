import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
// import "@/styles/popup.css";
import { useAppDispatch } from "@/hooks/hooks";
import { closeLoginPopup } from "@/slices/popupSlice";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postData } from "@/services/apiServices";
import { toast } from "react-toastify";
import { setReduxToken } from "@/slices/tokenSlice";
import { setUser } from "@/slices/userSlice";

export default function LoginPopup() {
  const dispatch = useAppDispatch();
  const [isLoginpopup,setIsLoginpopup] = useState(true);
  const [isOtpVerifying,setIsOtpVerifying] = useState(false);
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState<number>(120); // 2 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

  const redirecttoSignup = () => {
    router.push('/signup');
    dispatch(closeLoginPopup());
  }

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      notify: false
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number')
        .length(10, 'Must be 10 digits'),
      notify: Yup.boolean()
    }),
    onSubmit: values => {
      console.log('Form values:', values);
    
      const data = {
        phone:values.mobileNumber,
      }

      postData('send-otp',data).then((res:any)=>{
        console.log(res);
        toast.success(res?.data?.message);
        setIsLoginpopup(false);
        otpFormik.resetForm();
      }).catch((err:any)=>{
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      })
    }
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: ['', '', '', '']
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().required('Required').matches(/^[0-9]$/, 'Must be a single digit'))
        .length(4, 'Must be exactly 4 digits')
    }),
    onSubmit: values => {
      setIsOtpVerifying(true);
      console.log('OTP submitted:', values.otp.join(''));
      // Handle OTP verification here
      const data = {
        phone:formik.values.mobileNumber,
        otp:values.otp.join('')
      }
      postData('verify-login-otp',data).then((res:any)=>{
        console.log(res);
        toast.success(res?.data?.message);
        setIsOtpVerifying(false);
        otpFormik.resetForm();
        formik.resetForm();
        dispatch(setReduxToken(res?.data?.token));
        dispatch(setUser({ 
          id:res?.data?.user?._id,
          name:res?.data?.user?.username,
          balance:res?.data?.user?.balance,
          phone:formik.values.mobileNumber,
        }));
        dispatch(closeLoginPopup());
      }).catch((err:any)=>{
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
        setIsOtpVerifying(false);
      })
    }
  });

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otpFormik.values.otp];
    newOtp[index] = value;
    otpFormik.setFieldValue('otp', newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[name="otp[${index + 1}]"]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleResendOtp = () => {
    // Set disabled state immediately to prevent multiple rapid clicks
    setResendDisabled(true);
    setResendTimer(120); // Reset timer to 2 minutes immediately
    
    // Call your resend OTP API here
    const data = {
      phone: formik.values.mobileNumber,
    };
    
    postData('send-otp', data).then((res:any) => {
      console.log(res);
      toast.success(res?.data?.message || "OTP sent successfully");
    }).catch((err:any) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
      // Even if the API fails, we still want the timer to be running
      // so we don't modify the timer or disabled state here
    });
  };

  // Updated useEffect with additional cleanup and reset
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    // Start countdown when OTP step is active (not login popup)
    if (!isLoginpopup) {
      timer = setInterval(() => {
        setResendTimer((prevTime) => {
          if (prevTime <= 1) {
            setResendDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // Reset timer when going back to login step
      setResendTimer(120);
      setResendDisabled(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoginpopup]);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
      <div className="attri-popup login-popup">
        <div className="attri-popup-overlay"></div>
        <div className="attri-popup-wrapper">
          <button className="attri-popup-close" onClick={()=>dispatch(closeLoginPopup())}><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
          <div className="attri-popup-body d-flex align">
              <div className="login-left">
                <Image width={676} height={548} className="w-full" src={'https://res.cloudinary.com/doz4dnf0h/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1742919806/login_03_luywts.jpg'} alt=""></Image>
                {/* <div className="login-content">
                  <div className="attrismheading">Access orders, track orders, redeem Plixlife cash!</div>
                </div> */}
              </div>
              <div className="login-box">
                {isLoginpopup ? (
                  <div className="login-step-one">
                    <div className="attrismheading">Unlock Superior Discounts</div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <input
                          type="tel"
                          className={`form-control ${
                            formik.touched.mobileNumber && formik.errors.mobileNumber ? 'error' : ''
                          }`}
                          placeholder="Enter Mobile Number"
                          name="mobileNumber"
                          pattern="[6-9][0-9]{9}"
                          value={formik.values.mobileNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                          <div className="error-message text-red-100">{formik.errors.mobileNumber}</div>
                        ) : null}
                      </div>
                      <div className="form-group dflex align">
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            name="notify"
                            checked={formik.values.notify}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          Notify me for any updates & offers
                        </label>
                      </div>
                      <button type="submit" disabled={!formik.isValid} className="anchor-button anchor-button-line hovertime">
                        Continue
                      </button>
                    </form>
                    <p className="ortxt">OR</p>
                    {/* <button className="anchor-button anchor-button-line hovertime">
                      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5862 2.90651C15.7062 1.03279 13.2062 0.00110577 10.5423 0C5.05284 0 0.585617 4.44518 0.583394 9.90988C0.582283 11.6564 1.04117 13.3615 1.91284 14.8643L0.500061 20L5.77895 18.6222C7.23339 19.4123 8.87117 19.8275 10.5378 19.8281H10.5423C16.0306 19.8281 20.4984 15.3823 20.5001 9.91817C20.5012 7.26986 19.4662 4.77968 17.5862 2.90651ZM10.5423 18.1545H10.5389C9.05395 18.1545 7.59728 17.757 6.32617 17.0061L6.02395 16.8276L2.89117 17.6453L3.72728 14.6055L3.53062 14.2937C2.70228 12.9823 2.26451 11.4662 2.26506 9.90988C2.26673 5.3685 5.98006 1.67358 10.5456 1.67358C12.7562 1.67468 14.8345 2.53221 16.3973 4.08968C17.9601 5.6466 18.8201 7.71659 18.819 9.91707C18.8167 14.459 15.104 18.1545 10.5423 18.1545ZM15.0823 11.9854C14.8334 11.8616 13.6101 11.2628 13.3817 11.1799C13.1534 11.0969 12.9878 11.056 12.8223 11.3037C12.6567 11.5519 12.1795 12.1098 12.0345 12.2746C11.8895 12.4399 11.744 12.4603 11.4956 12.3365C11.2467 12.2126 10.4451 11.9511 9.49451 11.1074C8.75506 10.4506 8.25562 9.64007 8.11006 9.39183C7.96506 9.14358 8.09451 9.00979 8.21895 8.88649C8.33062 8.77536 8.46784 8.59734 8.59228 8.45248C8.71673 8.30818 8.75784 8.20424 8.84117 8.03948C8.92451 7.87416 8.88284 7.72986 8.82062 7.60546C8.7584 7.48162 8.26117 6.26251 8.0534 5.76713C7.85117 5.28446 7.64617 5.3497 7.49395 5.34196C7.34895 5.33477 7.18284 5.33367 7.01673 5.33367C6.85062 5.33367 6.58117 5.39559 6.35284 5.64328C6.12451 5.89152 5.48173 6.4903 5.48173 7.70885C5.48173 8.92741 6.37339 10.105 6.49784 10.2709C6.62228 10.4362 8.25284 12.9375 10.7484 14.0101C11.3417 14.2655 11.8056 14.4175 12.1673 14.532C12.7634 14.7205 13.3056 14.694 13.7345 14.6304C14.2123 14.5591 15.2067 14.0311 15.414 13.4528C15.6212 12.8744 15.6212 12.3785 15.559 12.2751C15.4967 12.1717 15.3312 12.1093 15.0823 11.9854Z" fill="#25D366"/>
                      </svg>
                      Whatsapp Login
                    </button> */}
                    <div className="login-footer">
                      <p>I accept that I have read & understood Attri's</p>
                      <Link href='/privacypolicy'>Privacy Policy</Link>
                      <Link href='/'>and T&Cs.</Link>
                      <button className="sign-btn" onClick={redirecttoSignup}>Sign Up</button>
                    </div>
                  </div>
                ) : (
                <div className="login-step-two">
                  <div className="attrismheading">OTP Verification</div>
                  <div className="verifi">
                    <p>We have sent verification code to</p>
                    <div className="verifi-number">
                      +91{formik.values.mobileNumber}
                      <button className="editbtn" onClick={()=>setIsLoginpopup(true)}>Edit</button>
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
                          onBlur={otpFormik.handleBlur}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !otpFormik.values.otp[index] && index > 0) {
                              const prevInput = document.querySelector(
                                `input[name="otp[${index - 1}]"]`
                              ) as HTMLInputElement;
                              if (prevInput) prevInput.focus();
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData('text');
                            const digits = pastedData.replace(/[^0-9]/g, '').substring(0, 4);
                            
                            if (digits) {
                              const newOtp = [...otpFormik.values.otp];
                              for (let i = 0; i < digits.length; i++) {
                                if (index + i < 4) {
                                  newOtp[index + i] = digits[i];
                                }
                              }
                              otpFormik.setFieldValue('otp', newOtp);
                              
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
                          : 'Invalid OTP'}
                      </div>
                    )}

                    <div className="form-group">
                      {resendTimer > 0 ? (
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
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.1333 8.5L13.8004 7.16667L12.4666 8.5M14 7.5C14 10.8137 11.3137 13.5 8 13.5C4.68629 13.5 2 10.8137 2 7.5C2 4.18629 4.68629 1.5 8 1.5C10.2013 1.5 12.1257 2.68542 13.1697 4.45273M8 4.16667V7.5L10 8.83333" stroke="#dce9ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Resend OTP
                        </button>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <button 
                        type="submit" 
                        className="anchor-button hovertime"
                        disabled={ !otpFormik.isValid || isOtpVerifying}
                      >
                        {isOtpVerifying ? 'Verifying...' : 'Verify'}
                      </button>
                    </div>
                  </form>
                  <div className="login-footer">
                    <button onClick={redirecttoSignup}>Sign Up</button>
                  </div>

                </div>
                )}
                {/* <div className="login-step-three">
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
                </div> */}
              </div>
          </div>
        </div>
      </div>
  );
}