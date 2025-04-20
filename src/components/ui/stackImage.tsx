import { getRandomLogo } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const StackImage = () => {
  const logo = getRandomLogo();
  console.log(logo);
  return (
    <div className="flex ">
      {logo?.map((i: string, ind: number) => {
        return (
          <>
            <Image
              src={i}
              height={25}
              width={25}
              alt={"..."}
              className="-mx-[5px]"
            />
          </>
        );
      })}
    </div>
  );
};

export default StackImage;
