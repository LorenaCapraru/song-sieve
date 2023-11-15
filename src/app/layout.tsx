import "./globals.css";
import RecoilRootWrapper from "./recoil/RecoilRootWrapper";

export const metadata = {
  title: "Song Sieve",
  description:
    "A application developed to enhance the music-sharing experience",
};

export default function RootLayout({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRootWrapper>
          <div className={`${className}`}>{children}</div>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
