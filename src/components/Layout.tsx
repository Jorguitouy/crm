import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Users, Wrench, LogOut, Target, Settings as SettingsIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/customers', label: 'Clientes', icon: Users },
  { href: '/services', label: 'Servicios', icon: Wrench },
  { href: '/audiences', label: 'Audiencias', icon: Target },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <Wrench className="h-6 w-6" />
            <span>Servi-CRM</span>
          </NavLink>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive ? 'bg-muted text-primary' : ''
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 mb-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive ? 'bg-muted text-primary' : ''
                  }`
                }
              >
                <SettingsIcon className="h-4 w-4" />
                Ajustes
            </NavLink>
          <Button size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

const MobileNav = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <NavLink
                        to="/"
                        className="flex items-center gap-2 text-lg font-semibold mb-4"
                    >
                        <Wrench className="h-6 w-6" />
                        <span>Servi-CRM</span>
                    </NavLink>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                                    isActive ? 'bg-muted text-foreground' : ''
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                     <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                                isActive ? 'bg-muted text-foreground' : ''
                            }`
                        }
                    >
                        <SettingsIcon className="h-5 w-5" />
                        Ajustes
                    </NavLink>
                </nav>
                <div className="mt-auto">
                    <Button size="sm" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};


const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {isMobile && <MobileNav />}
          <div className="w-full flex-1">
            {/* Can add a search bar here later */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;