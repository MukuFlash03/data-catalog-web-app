// Logo component that inserts image

import Image from "next/image";

export default function Logo() {
  return (
    <div
      className={`flex flex-row items-center space-x-2 leading-none text-white`}
    >
      <Image
        src="/logo.png"
        width={150}
        height={100}
        alt="Data Catalog Logo"
      />
      {/* <p className="text-[44px]">Data Catalog</p> */}
    </div>
  );
}
