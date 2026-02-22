import Image from "next/image"

export function Logo({
  size = "default",
}: { size?: "default" | "lg" | "xl" }) {
  const sizeMap = {
    default: { width: 128, height: 32, className: "h-8 w-auto" },
    lg: { width: 192, height: 48, className: "h-12 w-auto" },
    xl: { width: 480, height: 120, className: "h-20 md:h-32 w-auto" },
  }

  const { width, height, className } = sizeMap[size]

  return (
    <Image
      src="/images/logo_cube_noir.svg"
      alt="SymbiozAI"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
