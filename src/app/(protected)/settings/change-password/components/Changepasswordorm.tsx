"use client";
import BeatLoaderCmp from "@/app/common/Loader/BeatLoader/BeatLoader";
import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import { useFormik } from "formik";
import React, { useReducer, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
    currentPassword: Yup.string()
        .min(8, "Current Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Current Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Current Password is required"),
    newPassword: Yup.string()
        .min(8, "New Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "New Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("New Password is required"),

    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required("Confirm Password is required"),
});

const FormChangePassword = () => {
    const passWordStates = {
        show_current_password: false,
        show_new_password: false,
        show_confirm_new_password: false
    };
    const passwordStateReducer = (state: any, action: any) => {
        switch (action.type) {
            case 'current_password':
                return { ...state, show_current_password: !state.show_current_password };
            case 'new_password':
                return { ...state, show_new_password: !state.show_new_password };
            case 'confirm_new_password':
                return { ...state, show_confirm_new_password: !state.show_confirm_new_password };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(passwordStateReducer, passWordStates);
    const [loader, setLoader] = useState(false);
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (value: any) => {
            setLoader(true)
            console.log(value, "formdatat");
            try {
                const response = await API.Put("user/password", {
                    password: value.newPassword,
                    old_password: value.currentPassword,
                });
                console.log("API response:", response);
                // Handle the response data if needed
                if (response.error) {
                    setLoader(false)
                    console.error("API error:", response.message);
                    // Display validation errors for each field
                    if (response.message && typeof response.message === "object") {
                        Object.keys(response.message).forEach((fieldName) => {
                            const errorMessage = response.message[fieldName];
                            ToastService.error(errorMessage);
                        });
                    } else {
                        ToastService.error(response.message);
                    }
                } else {
                    setLoader(false)
                    console.log("Password change successful. Data:", response.message);
                    ToastService.success(response.message);
                    formik.resetForm();
                }
            } catch (error) {
                setLoader(false)
                console.error("Error during password change:", error);
                ToastService.error("An unexpected error occurred during the password change.");
            }
        },
    });
    return (
        <>
            {loader && <BeatLoaderCmp />}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={state.show_current_password ? "text" : "password"}
                                            id="current_password"
                                            name="currentPassword"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.currentPassword}
                                            placeholder="Current Password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <div className="input-group-btn">
                                            <span onClick={() => dispatch({ type: 'current_password' })} className="eye_icon">
                                                {!state.show_current_password ? (
                                                    <span className="absolute right-3 top-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30px"
                                                            height="30px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
                                                                stroke="#464455"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                ) : (
                                                    <span className="absolute right-3 top-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30px"
                                                            height="30px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                                                                stroke="#464455"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        {formik.touched.currentPassword && formik.errors.currentPassword ? (
                                            <div className="text-error  pl-3 pt-1">
                                                {formik.errors.currentPassword as string}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={state.show_new_password ? "text" : "password"}
                                            id="new_password"
                                            name="newPassword"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.newPassword}
                                            placeholder="New Password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <div className="input-group-btn">
                                            <span onClick={() => dispatch({ type: 'new_password' })} className="eye_icon">
                                                {!state.show_new_password ? (
                                                    <span className="absolute right-3 top-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30px"
                                                            height="30px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
                                                                stroke="#464455"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                ) : (
                                                    <span className="absolute right-3 top-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30px"
                                                            height="30px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                                                                stroke="#464455"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        {formik.touched.newPassword && formik.errors.newPassword ? (
                                            <div className="text-error  pl-3 pt-1">
                                                {formik.errors.newPassword as string}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={state.show_confirm_new_password ? "text" : "password"}
                                            id="confirm_new_password"
                                            name="confirmNewPassword"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmNewPassword}
                                            placeholder="Confirm Password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />

                                        <div className="input-group-btn">
                                            <span onClick={() => dispatch({ type: 'confirm_new_password' })} className="eye_icon">
                                                {!state.show_confirm_new_password ? (
                                                    <span className="absolute right-3 top-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30px"
                                                            height="30px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
                                                                stroke="#464455"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                ) : (
                                                    <span className="absolute right-3 top-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30px"
                                                            height="30px"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                                                                stroke="#464455"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                                            <div className="text-error  pl-3 pt-1">
                                                {formik.errors.confirmNewPassword as string}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <button
                                        type="submit"
                                        value="Sign In"
                                        disabled={loader}
                                        className="bg-mainBtn w-full cursor-pointer rounded-lg p-4 text-white transition hover:bg-opacity-90 "
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormChangePassword;