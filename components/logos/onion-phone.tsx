import Image from "next/image";

interface OnionPhoneProps {
  className?: string;
}

const OnionPhone = ({ className = "size-6" }: OnionPhoneProps) => (
  <Image
    src="/icon-512.png"
    alt="OnionPhone"
    width={512}
    height={512}
    className={className + " rounded-lg object-contain"}
  />
);

export default OnionPhone;
