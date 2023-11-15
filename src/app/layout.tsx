import "./globals.css";
import RecoilRootWrapper from "./recoil/RecoilRootWrapper";

export const metadata = {
  title: "Song Sieve",
  description:
    "A application developed to enhance the music-sharing experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  );
}
