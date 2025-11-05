import React from 'react';
import Container from '@/components/layout/Container/Container';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container>{children}</Container>;
}
