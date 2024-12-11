import { Menu } from "../../ui/blocks/common/menu/menu";
import { Footer } from "../../ui/blocks/common/footer/footer";

type LayoutProps = {
    children: React.ReactNode,
    menuVariant?:'def' | 'sec',
}

export function VisitorLayout({children, menuVariant='def'}:LayoutProps) {
  return (
    <>
      <Menu variant={menuVariant}/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
