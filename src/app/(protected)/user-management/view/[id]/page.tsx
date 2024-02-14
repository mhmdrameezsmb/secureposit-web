import { memo, useMemo } from "react";
import View from "../../components/View";
import Breadcrumb from "@/app/common/Breadcrumbs/Breadcrumb";
import { API } from "@/lib/fetch";

const Page = async ({ params }: { params: { id: string } }) => {
    // const getData = async () => {
    //     const { data } = await API.GetById("user", params.id,{
    //         populate:["parent_language.language","parent_profile","child","status_info"]
    //     });
    //     return data
    // }
    // const getCardDetails = async (stripe_customer_id:string) => {
    //     const { data } = await API.Post("payment/list-payment-methods", {
    //         stripe_customer_id: stripe_customer_id
    //     });
    //     return data
    // }
    // const data = await getData();
    // const cardDetails = await getCardDetails(data?.user?.parent_profile?.stripe_customer_id)  
    return (
        <>
            <Breadcrumb
                pageName="Parent Details"
                urls={[
                    { title: "Parents", url: "parent-management" },
                    { title: "Parent Details", url: `parent-management/view/${params.id}` }
                ]}
            />
            <View id={params.id} />
        </>
    );
}

export default memo(Page);