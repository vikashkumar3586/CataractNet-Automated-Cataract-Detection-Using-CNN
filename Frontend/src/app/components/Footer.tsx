export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              CataractNet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Automated Cataract Detection Using Deep Learning
            </p>
          </div>
          
          <div className="text-center md:text-right">
            {/* <p className="text-xs text-muted-foreground">
              This is a student research project for educational purposes.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Not intended for clinical diagnosis.
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
