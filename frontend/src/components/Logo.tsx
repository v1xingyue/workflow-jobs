import { SVGProps } from 'react'

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number
  variant?: 'default' | 'icon' | 'full'
}

export default function Logo({ 
  size = 32, 
  variant = 'default',
  className = '',
  ...props 
}: LogoProps) {
  const iconSize = variant === 'icon' ? size : size * 0.6

  if (variant === 'icon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        {/* 外圈 - 代表区块链的链环 */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 4"
          className="text-primary"
        />
        {/* 内圈 - 代表连接 */}
        <circle
          cx="32"
          cy="32"
          r="18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 3"
          className="text-secondary"
        />
        {/* 中心点 - 代表节点 */}
        <circle
          cx="32"
          cy="32"
          r="6"
          fill="currentColor"
          className="text-primary"
        />
        {/* 连接线 */}
        <path
          d="M32 12 L32 20 M32 44 L32 52 M12 32 L20 32 M44 32 L52 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent"
        />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Icon Part */}
      <g>
        {/* 外圈 */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 4"
          className="text-primary"
        />
        {/* 内圈 */}
        <circle
          cx="32"
          cy="32"
          r="18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 3"
          className="text-secondary"
        />
        {/* 中心点 */}
        <circle
          cx="32"
          cy="32"
          r="6"
          fill="currentColor"
          className="text-primary"
        />
        {/* 连接线 */}
        <path
          d="M32 12 L32 20 M32 44 L32 52 M12 32 L20 32 M44 32 L52 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent"
        />
      </g>

      {/* Text Part (only for full variant) */}
      {variant === 'full' && (
        <g>
          <text
            x="72"
            y="38"
            fontSize="24"
            fontWeight="700"
            fill="currentColor"
            className="text-base-content"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Workflow
          </text>
          <text
            x="72"
            y="56"
            fontSize="16"
            fontWeight="500"
            fill="currentColor"
            className="text-base-content/70"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Jobs
          </text>
        </g>
      )}
    </svg>
  )
}

