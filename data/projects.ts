import type { Project } from '~/types/data'

export const PROJECTS: Project[] = [
   
  {
    type: 'self',
    title: 'PaySync-npm Package',
    description: `PaySync is a TypeScript library that provides a unified interface for integrating multiple payment providers, such as Stripe, LemonSqueezy, and RozerPay. It allows developers to easily switch between different payment gateways without changing existing payment logic, simplifying the management of various payment systems.`,
    imgSrc: '/static/images/projects/paysync.webp',
    url: 'https://www.npmjs.com/package/paysync',
    // demo: <AvpDemo />,
    builtWith: ['Typescript'],
  },
   
]
