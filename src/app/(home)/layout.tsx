import { ThemeProvider } from "@/_providers/theme-provider";
import { HomeLayout } from "@/modules/layouts/home-layout";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <HomeLayout>
            {children}
        </HomeLayout>
        </ThemeProvider>
    );

}

export default Layout;