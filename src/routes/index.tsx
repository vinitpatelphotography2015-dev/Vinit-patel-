import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IntroAnimation } from "@/components/IntroAnimation";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/")({
  component: IntroPage,
});

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[color:var(--color-ink)] antialiased"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <CustomCursor />
      <IntroAnimation onComplete={() => navigate({ to: "/home" })} />
    </div>
  );
}
