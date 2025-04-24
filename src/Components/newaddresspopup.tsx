import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useState } from "react";
// import "@/styles/account.css";
// import "@/styles/popup.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postData } from "@/services/apiServices";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/hooks";

export default function NewAddressPopUp({closePopup}:{closePopup:()=>void}) {
	const [isLoading,setIsLoading] = useState(false);
	const user = useAppSelector((state: any) => state.user);
	const indianStates = [
		"Andhra Pradesh",
		"Andaman and Nicobar Islands",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chhattisgarh",
		"Delhi",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jharkhand",
		"Jammu and Kashmir",
		"Karnataka",
		"Kerala",
		"Ladakh",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana",
		"Tripura",
		"Uttar Pradesh",
		"Uttarakhand",
		"West Bengal"
	];
	// console.log("user",user)
  const formik = useFormik({
    initialValues: {
      name: '',
      mobileNumber: user?.phone,
      pincode: '',
      state: '',
      city: '',
      streetAddress: '',
      addressType: 'home'
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
      mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number')
        .length(10, 'Must be 10 digits'),
      pincode: Yup.string()
        .required('Pincode is required')
        .matches(/^\d{6}$/, 'Invalid pincode'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      streetAddress: Yup.string()
        .required('Street address is required')
        .min(3, 'Address must be at least 3 characters'),
      addressType: Yup.string()
        .required('Address type is required')
        .oneOf(['home', 'office'], 'Invalid address type')
    }),
    onSubmit:async (values) => {
			setIsLoading(true);
      console.log('Form values:', values);
    const data = {
      contact: values.mobileNumber,
      name: values.name,
      street: values.streetAddress,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      type: values.addressType,
	  userId: user?.id
    };
	await postData('add-address',data).then((res:any)=>{
		console.log(res);
		if(res.status === 200){
			setIsLoading(false);
			closePopup();
			formik.resetForm();
			toast.success('Address added successfully');
		}
	}).catch((err:any)=>{
		console.log(err);
		setIsLoading(false);
		toast.error('Something went wrong');
	});
	
    }
  });

  return (
    <div className="attri-popup newaddress-popup">
        <div className="attri-popup-overlay"></div>
        <div className="attri-popup-wrapper">
            <button className="attri-popup-close" onClick={closePopup}><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6654 4.3335L4.33203 21.6668M21.6654 21.6668L4.33203 4.3335L21.6654 21.6668Z" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round"></path></svg></button>
            <div className="attri-popup-body d-flex align">
				<h1 className="attrimdheading">Add New Address</h1>
				<div className="attri-popup-form">
					<form onSubmit={formik.handleSubmit}>
						<div className="form-row d-flex">
							<div className="form-group">
								<label className="form-label">Name</label>
								<input
									type="text"
									className={`form-control ${
										formik.touched.name && formik.errors.name ? 'error' : ''
									}`}
									placeholder="Name"
									{...formik.getFieldProps('name')}
								/>
								{formik.touched.name && formik.errors.name && (
									<div className="error-message">{formik.errors.name}</div>
								)}
							</div>
							
							<div className="form-group">
								<label className="form-label">Mobile Number</label>
								<input
									type="tel"
									className={`form-control ${
										formik.touched.mobileNumber && formik.errors.mobileNumber ? 'error' : ''
									}`}
									placeholder="Mobile Number"
									{...formik.getFieldProps('mobileNumber')}
								/>
								{formik.touched.mobileNumber && formik.errors.mobileNumber && (
									<div className="error-message">{formik.errors.mobileNumber as string}</div>
								)}
							</div>
							<div className="form-group">
								<label className="form-label">Pincode</label>
								<input
									type="text"
									className={`form-control ${
										formik.touched.pincode && formik.errors.pincode ? 'error' : ''
									}`}
									placeholder="Enter your pincode"
									{...formik.getFieldProps('pincode')}
								/>
								{formik.touched.pincode && formik.errors.pincode && (
									<div className="error-message">{formik.errors.pincode}</div>
								)}
							</div>
							<div className="form-group">
								<label className="form-label">State</label>
								<select
									className={`form-control ${
										formik.touched.state && formik.errors.state ? 'error' : ''
									}`}
									{...formik.getFieldProps('state')}
								>
									<option value="">Select</option>
									{indianStates.map((state, index) => (
										<option key={index} value={state}>{state}</option>
									))}
									
								</select>
								{formik.touched.state && formik.errors.state && (
									<div className="error-message">{formik.errors.state}</div>
								)}
							</div>
							<div className="form-group">
								<label className="form-label">City</label>
								<input
									type="text"
									className={`form-control ${
										formik.touched.city && formik.errors.city ? 'error' : ''
									}`}
									placeholder="Enter your city"
									{...formik.getFieldProps('city')}
								/>
								{formik.touched.city && formik.errors.city && (
									<div className="error-message">{formik.errors.city}</div>
								)}
							</div>
							<div className="form-group">
								<label className="form-label">Street Address</label>
								<input
									type="text"
									className={`form-control ${
										formik.touched.streetAddress && formik.errors.streetAddress ? 'error' : ''
									}`}
									placeholder="Enter your address"
									{...formik.getFieldProps('streetAddress')}
								/>
								{formik.touched.streetAddress && formik.errors.streetAddress && (
									<div className="error-message">{formik.errors.streetAddress}</div>
								)}
							</div>
							<div className="form-group form-radio">
								<div className="radio-item">
									<input
										className="radio-input"
										type="radio"
										id="home"
										name="addressType"
										value="home"
										checked={formik.values.addressType === 'home'}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									<label htmlFor="home">Home</label>
								</div>
								<div className="radio-item">
									<input
										className="radio-input"
										type="radio"
										id="office"
										name="addressType"
										value="office"
										checked={formik.values.addressType === 'office'}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									<label htmlFor="office">Office</label>
								</div>
								{formik.touched.addressType && formik.errors.addressType && (
									<div className="error-message">{formik.errors.addressType}</div>
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
  );
}