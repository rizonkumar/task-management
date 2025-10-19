import * as LucideIcons from 'lucide-react';

// Map of icon names to Lucide components
export const getIcon = (iconName, props = {}) => {
  const Icon = LucideIcons[iconName] || LucideIcons.FileText;
  return <Icon {...props} />;
};

// Icon component wrapper
export const TaskIcon = ({ name, className = '', size = 20 }) => {
  const Icon = LucideIcons[name] || LucideIcons.FileText;
  return <Icon size={size} className={className} />;
};

// Commonly used task icons
export const taskIcons = {
  Activity: 'Activity',
  Users: 'Users',
  Laptop: 'Laptop',
  Code: 'Code',
  FileText: 'FileText',
  Mail: 'Mail',
  Phone: 'Phone',
  Calendar: 'Calendar',
  Coffee: 'Coffee',
  ShoppingCart: 'ShoppingCart',
  Home: 'Home',
  Briefcase: 'Briefcase',
  Book: 'Book',
  Heart: 'Heart',
  Music: 'Music',
  Camera: 'Camera',
  MessageCircle: 'MessageCircle',
  Send: 'Send',
  DollarSign: 'DollarSign',
  Target: 'Target',
};
