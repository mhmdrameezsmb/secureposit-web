"use client";
import Image from "next/image";
import ReactPlayer from "react-player";

export interface AlertPopupProps {
  mp4: any;
}
export default function Player({ mp4 }: AlertPopupProps) {
  console.log(mp4, "sajerg");

  return (
    <div style={{ maxWidth: "50%", width: "50%" }}>
      {mp4 != null ? (
        <ReactPlayer
          url={mp4}
          // url='https://giistyxelor.s3.amazonaws.com/giists/video/video0cP3w019TiZYYcUy22WY.mp4'
          controls={true}
          width="50%"
          height="50%"
        />
      ) : (
        "No video found"
      )}
    </div>
  );
}
