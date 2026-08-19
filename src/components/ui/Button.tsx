import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";

type Variant = "primary" | "outline" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors duration-500";

const variants: Record<Variant, string> = {
  primary:
    "bg-txt-100 px-7 py-4 text-[15px] text-bg-000 hover:text-bg-000 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_40px_-24px_var(--accent)]",
  outline:
    "border border-line-strong px-5 py-2.5 text-[13px] text-txt-100 hover:text-bg-000",
  ghost: "px-0 py-0 text-[15px] text-txt-100 hover:text-accent",
};

/** The wipe layer that slides up behind the label on hover. */
const fills: Record<Variant, string> = {
  primary: "bg-accent",
  outline: "bg-txt-100",
  ghost: "",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Magnetic strength={variant === "ghost" ? 0.2 : 0.35}>
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {variant !== "ghost" && (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
            >
              <path
                d="M2 8h12M9 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {variant !== "ghost" && (
          <span
            aria-hidden
            className={`absolute inset-0 -z-10 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${fills[variant]}`}
          />
        )}
      </Link>
    </Magnetic>
  );
}
