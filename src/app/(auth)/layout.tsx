import Header from "@/components/Header";

export default function AuthLayout({
    children
}: Readonly<{ children?: React.ReactNode }>) {
    return (
        <div className="flex flex-col h-screen">
            <div className="h-[18%]">
                <Header />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}