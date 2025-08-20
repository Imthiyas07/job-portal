import {
  Search,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: Search,
    title: "aiJobMatching",
    description: "aiJobMatchingDesc",
  },
  {
    icon: FileText,
    title: "resumeBuilder",
    description: "resumeBuilderDesc",
  },
  {
    icon: MessageSquare,
    title: "directCommunication",
    description: "directCommunicationDesc",
  },
  {
    icon: Award,
    title: "skillBadges",
    description: "skillBadgesDesc",
  },
];

export const employerFeatures = [
  {
    icon: Users,
    title: "hospitalityTalentPool",
    description: "hospitalityTalentPoolDesc",
  },
  {
    icon: BarChart3,
    title: "aiJobDescriptions",
    description: "aiJobDescriptionsDesc",
  },
  {
    icon: Shield,
    title: "smartDashboard",
    description: "smartDashboardDesc",
  },
  {
    icon: Clock,
    title: "fasterHiring",
    description: "fasterHiringDesc",
  },
];

// Navigation items configuration
export const NAVIGATION_MENU = [
  { id: "employer-dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "post-job", name: "Post Job", icon: Plus },
  { id: "manage-jobs", name: "Manage Jobs", icon: Briefcase },
  { id: "company-profile", name: "Company Profile", icon: Building2 },
];

// Categories and job types
export const CATEGORIES = [
  { value: "Kitchen", label: "Kitchen & Culinary" },
  { value: "Service", label: "Service & Guest Experience" },
  { value: "Management", label: "Management & Operations" },
  { value: "Delivery", label: "Delivery & Logistics" }
];


export const JOB_TYPES = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

export const SALARY_RANGES = [
  "Less than $1000",
  "$1000 - $15,000",
  "More than $15,000",
];
