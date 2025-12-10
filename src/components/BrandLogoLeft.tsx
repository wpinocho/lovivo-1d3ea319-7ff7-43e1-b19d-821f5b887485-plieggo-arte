export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center gap-3">
      <img 
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a/1765330504462-dyr43cg78.png" 
        alt="Plieggo Logo" 
        className="w-[60px] h-[60px] object-contain"
      />
      <span className="text-2xl font-heading font-bold tracking-tight text-foreground">
        Plieggo
      </span>
    </a>
  )
}