import type React from "react"
export const LineChart = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}
export const Line = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}
export const XAxis = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}
export const YAxis = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}
export const CartesianGrid = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}
export const Tooltip = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}
export const Legend = ({ children, ...props }: React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>
}
export const ResponsiveContainer = ({ children, ...props }: React.ComponentProps<"div">) => {
  return (
    <div style={{ width: "100%", height: "100%" }} {...props}>
      {children}
    </div>
  )
}

