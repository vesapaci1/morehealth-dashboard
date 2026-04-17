type BrandLogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function BrandLogo({ variant = "dark", className = "" }: BrandLogoProps) {
  // Source image is white wordmark on transparent background.
  // - "light" surfaces (sidebar, white panels): flip to solid dark for legibility.
  // - "dark"  variant prop = render on dark surfaces → keep the white pixels.
  // Default = "dark" (variant name refers to the ink color, not the surface).
  const filter = variant === "light" ? "none" : "brightness(0) saturate(100%)";
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/__mockup/images/more-health-logo.png"
        alt="More Health"
        className="h-7 w-auto object-contain select-none"
        style={{ filter }}
        draggable={false}
      />
    </div>
  );
}
