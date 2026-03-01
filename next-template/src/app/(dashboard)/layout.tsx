import { ProtectedShell } from '@dashboard/shared';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <ProtectedShell>{children}</ProtectedShell>;
}
