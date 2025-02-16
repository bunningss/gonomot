import { Container } from "./container";
import { Heading } from "./heading";

export function AuthWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[calc(theme(height.screen)-140px)]">
        <div className="max-w-[500px] w-full shadow-md rounded-md border">
          {/* Main Form */}
          <div className="p-2 md:p-8 space-y-4">
            {title && <Heading className="text-center">{title}</Heading>}

            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
