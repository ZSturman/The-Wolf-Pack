import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  external?: boolean;
};

const variants = {
  primary:
    "bg-forest text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:bg-ink",
  secondary:
    "border border-ink/12 bg-white/85 text-ink hover:border-ink/30 hover:bg-white",
  ghost:
    "border border-transparent bg-transparent text-ink hover:border-ink/10 hover:bg-white/55",
  inverse:
    "bg-white text-forest shadow-[0_18px_40px_rgba(0,0,0,0.2)] hover:bg-sand",
};

const sharedClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  external = false,
}: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
    </>
  );

  const classes = cn(sharedClasses, variants[variant], className);

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
