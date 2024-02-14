"use client";

import { useMyContext } from "@/lib/context/PostContext";
import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import { AlertDialog, Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import BeatLoaderCmp from "../../Loader/BeatLoader/BeatLoader";

export interface AlertPopupActionData {
  action: "cancel" | "continue";
  data?: any;
}
export interface AlertPopupProps {
  title: string;
  description: string;
  open: boolean;
  actionClick?: (obj: AlertPopupActionData) => void;
  onOpenChange?: (status: boolean) => void;
}
export default function AlertPopup({
  title,
  description,
  open,
  actionClick = () => {},
  onOpenChange,
}: AlertPopupProps) {
  const { view, setView, isFlagDelete, setFlagDelete } = useMyContext();

  const [reason, setReason] = useState("");


  const click = () => {
    const startsWithSpace = reason.startsWith(" ");
    const endsWithSpace = reason.endsWith(" ");
    if (reason === "") {
      ToastService.error("Please provide a reason.");
    } else if (startsWithSpace) {
      ToastService.error("Remove unwanted spacing at the beginning");
    } else if (endsWithSpace) {
      ToastService.error("Remove unwanted spacing at the end");
    } else {
      setFlagDelete(true);
      setView(false);
      actionClick({ action: "continue", data: { reason } });
    }
  };


  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Content style={{ maxWidth: 520 }}>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="5">
          {description}
          {isFlagDelete && <BeatLoaderCmp />}
          <br></br>
          <br></br>
          
            <>
              <AlertDialog.Description size="5">
                Please enter the reason for deleting the user
              </AlertDialog.Description>
              <textarea
                id="reason"
                name="reason"
                rows={3}
                placeholder="Type your reason"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onChange={(e) => setReason(e.target.value)}
              />
            </>
         
          {view && (
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button
                  variant="solid"
                  style={{ backgroundColor: "#da593f" }}
                  onClick={() => {
                    actionClick({ action: "cancel" });
                    setReason("");
                  }}
                >
                  No
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  style={{ backgroundColor: "black" }}
                  onClick={click}
                >
                  Yes
                </Button>
              </AlertDialog.Action>
            </Flex>
          )}
        </AlertDialog.Description>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
