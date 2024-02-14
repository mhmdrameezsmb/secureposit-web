"use client";

import { useMyContext } from "@/lib/context/PostContext";
import { API } from "@/lib/fetch";
import ToastService from "@/lib/toastService";
import { AlertDialog, Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";

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
  const click = () => {
    console.log("sa");
    

    
    actionClick({ action: "continue" });
  };
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Content style={{ maxWidth: 520 }}>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="5">
          {description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="solid"
              style={{ backgroundColor: "#da593f" }}
              onClick={() => {
                actionClick({ action: "cancel" });
              }}
            >
              No
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              style={{ backgroundColor: "black" }}
              onClick={() => {
                click();
              }}
            >
              Yes
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
