import {
  LayoutDashboard,
  Users,
  UserCog,
  ClipboardList,
  Stethoscope,
  Wind,
  CalendarRange,
  MapPinned,
  AlertTriangle,
  UsersRound,
  Boxes,
  FileText,
  BarChart3,
} from "lucide-react";
import type { NavSection } from "./types";


export const navSections: NavSection[] = [
  {
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "CORE",
    items: [
      { label: "Employees", href: "/employees", icon: Users },
      { label: "User Management", href: "/user-management", icon: UserCog },
    ],
  },
  {
    title: "HEALTH",
    items: [
      { label: "Medical Exams", href: "/medical-exams", icon: ClipboardList },
      { label: "OPD", href: "/opd", icon: Stethoscope },
      { label: "Occupational Disease", href: "/occupational-disease", icon: Wind },
      { label: "Appointments", href: "/appointments", icon: CalendarRange },
    ],
  },
  {
    title: "SAFETY",
    items: [
      { label: "Hazards & Exposure", href: "/hazards", icon: MapPinned },
      { label: "Incidents", href: "/incidents", icon: AlertTriangle },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Staff & Workforce", href: "/staff", icon: UsersRound },
      { label: "Inventory & Assets", href: "/inventory", icon: Boxes },
      { label: "Documents", href: "/", icon: FileText },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [{ label: "Compliance & Reports", href: "/compliance", icon: BarChart3 }],
  },
];
