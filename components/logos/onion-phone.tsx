import Image from "next/image";

interface OnionPhoneProps {
  className?: string;
}

const OnionPhone = ({ className = "size-6" }: OnionPhoneProps) => (
  <Image
    src="/logo.png"
    alt="OnionPhone"
    width={677}
    height={369}
    className={className + " object-contain"}
    priority
  />
);

export default OnionPhone;
