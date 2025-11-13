import { useEffect, useState, useRef } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, Archive, Bell, LogOut, User as UserIcon } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@features/auth/authSlice'
import { fetchUserNotifications, selectNotifications } from '@features/notifications/notificationsSlice';

export default function AdminLayout() {
  const user = useSelector((state) => state.auth.user)
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUserNotifications());
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    dispatch(logout())
    // The ProtectedRoute will handle the navigation to /login
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/pedidos', icon: ShoppingCart, label: 'Pedidos' },
    { to: '/admin/productos', icon: Package, label: 'Productos' },
    { to: '/admin/stock', icon: Archive, label: 'Stock' },
    { to: '/admin/usuarios', icon: Users, label: 'Usuarios' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo/Header */}
        <Link to="/" className="p-6 border-b border-gray-200 block hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <img src="/cake-roll.svg" alt="logo" className="w-10 h-10" />
            <div>
              <h2 className="font-bold text-lg">Santa Martha</h2>
              <p className="text-sm text-gray-500">Panadería</p>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <NavLink 
            to="/admin/notificaciones"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                isActive
                  ? 'bg-orange-50 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Bell className="w-5 h-5" />
            <span>Notificaciones</span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </NavLink>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Panel de Administración
            </h1>
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(prev => !prev)} className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 py-1">
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserIcon className="w-4 h-4" />
                    <span>Mi Perfil</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
