import Image from "next/image";

interface OnionCallProps {
  className?: string;
}

const OnionCall = ({ className = "size-6" }: OnionCallProps) => (
  <Image
    src="/icon-512.png"
    alt="OnionCall"
    width={512}
    height={512}
    className={className + " rounded-lg object-contain"}
  />
);

export default OnionCall;
