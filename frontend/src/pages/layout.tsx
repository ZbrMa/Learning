import { Menu } from "../ui/blocks/menu/menu";
import { Footer } from "../ui/blocks/footer/footer";

type LayoutProps = {
    children: React.ReactNode,
    menuVariant?:'def' | 'sec',
}

export function Layout({children, menuVariant='def'}:LayoutProps) {
  return (
    <>
      <Menu variant={menuVariant}/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
