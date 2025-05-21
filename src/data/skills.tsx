import React from 'react';
import { Paintbrush, Layers, MonitorSmartphone, LayoutGrid, Workflow, CircleUserRound, Lightbulb, Code } from 'lucide-react';
import { Skill } from '../types';

export const skills: Skill[] = [
  {
    id: 1,
    name: 'UI Design',
    icon: <Paintbrush size={36} />,
  },
  {
    id: 2,
    name: 'UX Design',
    icon: <Layers size={36} />,
  },
  {
    id: 3,
    name: 'Responsive Design',
    icon: <MonitorSmartphone size={36} />,
  },
  {
    id: 4,
    name: 'Wireframing',
    icon: <LayoutGrid size={36} />,
  },
  {
    id: 5,
    name: 'Prototyping',
    icon: <Workflow size={36} />,
  },
  {
    id: 6,
    name: 'User Research',
    icon: <CircleUserRound size={36} />,
  },
  {
    id: 7,
    name: 'Design Thinking',
    icon: <Lightbulb size={36} />,
  },
  {
    id: 8,
    name: 'HTML/CSS',
    icon: <Code size={36} />,
  },
];