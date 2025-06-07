
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="py-6 px-8 border-t border-gray-200 dark:border-gray-800 text-center">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-muted-foreground">
          Telif Hakkı © 2025 Ardalar Tüm hakları saklıdır. Bu site{" "}
          <a
            href="https://www.linkedin.com/in/alican-kaya-881650234/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline underline-offset-4",
              "transition-colors hover:text-foreground"
            )}
          >
            Alican Kaya
          </a>{" "}
          ve{" "}
          <a
            href="https://www.linkedin.com/in/sina-toprak-gulec-26761923b/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline underline-offset-4",
              "transition-colors hover:text-foreground"
            )}
          >
            Toprak Güleç
          </a>{" "}
          tarafından yapılmıştır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
