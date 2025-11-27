import { Button } from "@/components/ui/button";

import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Image src="/youtube-logo.png" height={60} width={50} alt="Youtube" />
      <p className="text-xl font-semibold tracking-tighter">Youtube</p>
    </div>
  );
}
