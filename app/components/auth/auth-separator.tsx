interface AuthSeparatorProps {
  children: string
}

export function AuthSeparator({ children }: AuthSeparatorProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-800"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 text-gray-400 bg-[#0a0b1e]">{children}</span>
      </div>
    </div>
  )
}
