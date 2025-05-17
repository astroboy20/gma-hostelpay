import Link from "next/link"

interface LogoProps {
  variant?: "default" | "footer"
  href?: string
}

export function Logo({ variant = "default", href = "/" }: LogoProps) {
  const textColor = variant === "footer" ? "text-blue-400" : "text-blue-600"
  const bgColor = variant === "footer" ? "bg-blue-400" : "bg-blue-600"

  const logo = (
    <div className="flex items-center gap-2">
      <div className={`${bgColor} text-white font-bold rounded-md h-8 w-8 flex items-center justify-center`}>GMA</div>
      <span className={`font-bold text-xl ${textColor}`}>GMA HostelPay</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{logo}</Link>
  }

  return logo
}
