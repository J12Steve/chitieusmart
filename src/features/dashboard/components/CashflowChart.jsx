import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlassCard } from '../../../components/ui';
import { formatCompact, formatCurrency } from '../../../utils/formatCurrency';
import { listItem } from '../../../utils/motion';

const SERIES = {
  income: { label: 'Thu', stroke: '#5FB894', textClass: 'text-income' },
  expense: { label: 'Chi', stroke: '#E57E8C', textClass: 'text-expense' },
};

// Tooltip kính mờ thay cho tooltip mặc định của Recharts
function GlassTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-2xl px-4 py-3 text-sm">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className={SERIES[p.dataKey].textClass}>
          {SERIES[p.dataKey].label}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function CashflowChart({ data }) {
  return (
    <GlassCard variants={listItem}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Dòng tiền 30 ngày</h2>
        <div className="flex gap-4 text-sm text-ink-soft">
          {Object.entries(SERIES).map(([key, s]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.stroke }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* ResponsiveContainer cần cha có chiều cao cố định */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            {/* Gradient mờ dần dưới mỗi đường: tạo cảm giác "kính" thay vì nét cứng */}
            <defs>
              {Object.entries(SERIES).map(([key, s]) => (
                <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.stroke} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={s.stroke} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            {/* Cố ý KHÔNG có <CartesianGrid /> → không có đường lưới cứng nhắc */}
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={28}
              tick={{ fill: '#6B7089', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={48}
              domain={[0, 'auto']}
              tickFormatter={formatCompact}
              tick={{ fill: '#6B7089', fontSize: 12 }}
            />
            <Tooltip content={<GlassTooltip />} cursor={{ stroke: '#A5B1F5', strokeWidth: 1 }} />

            {/* type="monotone" → đường cong mềm, không bị lượn quá đà qua các điểm */}
            {Object.entries(SERIES).map(([key, s]) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={s.stroke}
                strokeWidth={2.5}
                fill={`url(#fill-${key})`}
                activeDot={{ r: 5, strokeWidth: 0 }}
                animationDuration={900}
                animationEasing="ease-out"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}