"use client"

import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import { useRouter } from "next/navigation";
import Editor from "../../component/EditorTemplate";


export default function View({ params }: { params: { id: string } }) {

    console.log(params?.id, "ddd");


    const router = useRouter()
    const handleDataReceived = async (data: any) => {
        console.log(data, "sa dddddd");
        const { error, message } = await API.UpdateById("template", params.id, data);
        if (!!error) {
            ToastService.error(message)
            return;
        }
        ToastService.success("Content updated successfully")
        // router.refresh();
        router.back();
    };


    return (
        <div className="mb-5 dark:border-strokedark dark:bg-boxdark">
            <div className="flex gap-3 p-5"></div>
            <Editor onDataReceived={handleDataReceived} id={params?.id} />
        </div>
    );
}
