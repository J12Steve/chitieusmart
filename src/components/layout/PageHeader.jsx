import { motion } from 'framer-motion';
import { listItem } from '../../utils/motion';

export default function PageHeader({ title, subtitle, action }) {
  return (
    <motion.header variants={listItem} className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {subtitle && <p className="text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </motion.header>
  );
}