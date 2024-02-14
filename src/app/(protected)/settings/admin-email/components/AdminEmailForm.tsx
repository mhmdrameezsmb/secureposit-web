"use client";
import BeatLoaderCmp from "@/app/common/Loader/BeatLoader/BeatLoader";
import LoaderMain from "@/app/common/Loader/SubLoader/page";
import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FadeLoaderCmp from "@/app/common/Loader/FadeLoader/page";

const validationSchema = Yup.object({
    adminNotifyEmail: Yup.string().email('Invalid email address').required('Email is required'),
});
const AdminEmailForm = () => {
    const [loader, setLoader] = useState(false);
    const [adminEmail, setAdminEmail] = useState<string>()
    const [settingId, setSettingId] = useState<string>()
    const getData = async () => {
        try {
            const { data } = await API.Find("setting", {
                where: { name: "admin_notify_email" },
            });
            console.log("Data email", data?.setting?.value);
            setAdminEmail(data?.setting?.value);
            setSettingId(data?.setting?.id || null);
            formik.setValues({
                adminNotifyEmail: data?.setting?.value || "",
            });
        } catch (error) {
            console.error("Error retrieving data:", error);
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const formik = useFormik({
        initialValues: {
            adminNotifyEmail: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (value: any) => {
            console.log(value, "formdatat");
            setLoader(true)
            const { adminNotifyEmail } = value;
            try {
                // Check if the entered email is the same as the one in the session
                if (adminEmail === adminNotifyEmail) {
                    ToastService.error("Please use a different email.")
                    setLoader(false)
                    return;
                }
                // Update the admin_notify_email setting
                const updateResponse = await API.UpdateById(
                    `setting`,
                    settingId || "",
                    { value: adminNotifyEmail }
                );
                if (updateResponse.error) {
                    console.error("API error:", updateResponse.message);
                    ToastService.error(updateResponse.message)
                    setLoader(false)
                } else {
                    console.log("API data:", updateResponse.data);
                    console.log("API success message:", updateResponse.message);
                    ToastService.success("Admin email updated successfully.")
                    setAdminEmail(adminNotifyEmail);
                    setLoader(false)
                }
            } catch (error) {
                console.error("Error during admin email update:", error);
                ToastService.error("An unexpected error occurred during the admin email update.")
                setLoader(false)
            }
        }
    });
    return (
        <>
            {loader && <FadeLoaderCmp />}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="admin_notify_email"
                                            name="adminNotifyEmail"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.adminNotifyEmail}
                                            placeholder="Admin Email"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        {formik.touched.adminNotifyEmail && formik.errors.adminNotifyEmail ? (
                                            <div className="text-error  pl-3 pt-1">
                                                {formik.errors.adminNotifyEmail as string}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-3">
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
    )
}

export default AdminEmailForm
